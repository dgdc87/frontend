import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@class/User';
import * as cryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userData: User;
  private token: string;
  private KEY = 'myapp2020';

  private loggedSource = new BehaviorSubject<boolean>(false);
  logged$ = this.loggedSource.asObservable();

  constructor(private http: HttpClient) {
    try{
      let localData: any = localStorage.getItem(this.KEY);
      if (localData && localData !== '[object Object]') {
        localData = JSON.parse(localData);
      }
      if(localData.token && localData.user){
        this.userData = new User(localData.user);
        this.token = localData.token;
        this.loggedSource.next(true);
      }
      if (!localData || localData === '[object Object]') {
        this.resetData();
      }
    }catch (e){
      this.resetData();
    }
  }

  public isAuthenticated(): boolean {
    if (this.token){ return true; }
    return false;
  }

  public resetData = () => {
    this.userData = new User();
    this.token = null;
    const obj = {
      user: this.userData.toString(),
      token: null
    };
    localStorage.setItem(this.KEY, JSON.stringify(obj));
    this.loggedSource.next(false);
  }

  public getData(): User {
    return this.userData;
  }

  public getRole(): number {
    return this.userData.getId_role();
  }

  public hasPermiso(role): boolean {
    return this.userData.getId_role() === role;
  }

  public setUserData = (data: User, token?) => {
    this.userData = data;
    if(token){ this.token = token; }
    const obj = {
      user: data.getObject(),
      token: token ? token : this.token
    }
    localStorage.setItem(this.KEY, JSON.stringify(obj));
  }

  public getId = () => this.userData.getId();

  public getToken = () => this.token;

  public login(username: string, password: string): Promise<User>{
    const url = '/user/login';
    const promise = new Promise<User>((resolve, reject) => {
      this.http.post<any>(url, {username: username, password: cryptoJS.MD5(password).toString()}).subscribe(
        (response) => {
            // Se resuelve la promesa
            if (response.user && response.token){
              this.setUserData(new User(response.user), response.token);
              this.loggedSource.next(true);
              resolve(this.getData());
            }
        },
        (error) => { // Función de fallo en la petición
            reject(error);
        }
      );
    });
    return promise;
  }

  public logout = () => this.resetData();

  public registerUser = ( user: User, password) => {
    const url = '/user/signin';
    const data = { ...user.getObject(), password: cryptoJS.MD5(password).toString() };
    console.log(data);
    const promise = new Promise<User>((resolve, reject) => {
      this.http.post<any>(url, data).subscribe(
        (response) => {
            // Se resuelve la promesa
            if (response.user && response.token){
              this.setUserData(new User(response.user), response.token);
              this.loggedSource.next(true);
              resolve(new User(response.user));
            }
        },
        (error) => { // Función de fallo en la petición
            reject(error);
        }
      );
    });
    return promise;
  }

}
