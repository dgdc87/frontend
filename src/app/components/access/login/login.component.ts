import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication/authentication.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { MyErrorStateMatcher } from '@class/MyErrosStateMatcher';
import { Router } from '@angular/router';
import { GlobalService } from '@app/services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  formData = {
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  };

  constructor(private authService: AuthenticationService,
              private globalService: GlobalService,
              public router: Router) {}

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate([`/home`]);
    }
  }

  disableLogin = () => !this.formData.username.valid || !this.formData.password.valid;

  login() {
    this.globalService.setLoading(true);
    this.authService.login(this.formData.username.value, this.formData.password.value).then( result => {
      this.globalService.setLoading(false);
      if (result && result.getId()){
         this.router.navigate([`/home`]);
      }
    }).catch(error => {
      this.globalService.setLoading(false);
      console.log(error);
      const messages = error && error.error && error.error.error ? [error.error.error] : ['erros.unexpected-error'];
      this.globalService.dialogService.openSimpleDialog('auto', messages);
    });
  }

}
