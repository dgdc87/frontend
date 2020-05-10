export class User {
  private id: string;
  private username: string;
  private firstname: string;
  private lastname: string;
  private email: string;
  private reg_date: Date;
  private update_date: Date;
  private last_login: Date;
  private id_role: number;

  constructor(obj?) {
    if (obj) {
      this.id = obj.id;
      this.username = obj.username;
      this.firstname = obj.firstname;
      this.lastname = obj.lastname;
      this.email = obj.email;
      this.update_date = obj.update_date;
      this.reg_date = obj.reg_date;
      this.last_login = obj.last_login;
      this.id_role = obj.id_role;
    }
  }


    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getFirstname(): string {
        return this.firstname;
    }

    public setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    public getLastname(): string {
        return this.lastname;
    }

    public setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getReg_date(): Date {
        return this.reg_date;
    }

    public setReg_date(reg_date: Date): void {
        this.reg_date = reg_date;
    }

    public getUpdate_date(): Date {
        return this.update_date;
    }

    public setUpdate_date(update_date: Date): void {
        this.update_date = update_date;
    }

    public getLast_login(): Date {
        return this.last_login;
    }

    public setLast_login(last_login: Date): void {
        this.last_login = last_login;
    }

    public getId_role(): number {
        return this.id_role;
    }

    public setId_role(id_role: number): void {
        this.id_role = id_role;
    }


  public getObject(): any {
    const userData = {
      id: this.id,
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      last_login: this.last_login,
      reg_date: this.reg_date,
      update_date: this.update_date,
      id_role: this.id_role
    };
    return userData;
  }

  public toString(): string {
    return JSON.stringify(this.getObject());
  }
}
