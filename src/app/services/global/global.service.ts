import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DialogService } from '@dgdc87/dialog';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private loadingSource = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSource.asObservable();

  constructor(public dialogService: DialogService) { }

  public setLoading = loading => {
    this.loadingSource.next(loading);
  }

}
