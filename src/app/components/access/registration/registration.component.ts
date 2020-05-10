import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { GlobalService } from '@services/global/global.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { MyErrorStateMatcher } from '@class/MyErrosStateMatcher';
import { Router } from '@angular/router';
import { User } from '@app/class/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  formData = {
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.email, Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required,  Validators.minLength(6)]),
    rpassword: new FormControl('', [Validators.required,  Validators.minLength(6)])
  };

  constructor(private authService: AuthenticationService,
              private globalService: GlobalService,
              public router: Router) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate([`/home`]);
    }
  }

  getErrorMessagePassword = () => {
    if (this.formData.password.value.length < 6 || this.formData.rpassword.value.length < 6){
      return 'pages.login.passwords-min-length';
    }else if (this.formData.password.value !== this.formData.rpassword.value){
      return 'pages.login.passwords-must-match';
    }
    return '';
  }

  disableRegistration = () => {
    let disable = false;
    Object.keys(this.formData).forEach(k => {
      if (!this.formData[k].valid) {
        disable = true;
      }
    });
    if ( this.formData.password.value !== this.formData.rpassword.value ){
      disable = true;
    }
    return disable;
  }

  registerUser = () => {
    this.globalService.setLoading(true);
    const data = {
      username: this.formData.username.value,
      firstname: this.formData.firstname.value,
      email: this.formData.email.value,
      lastname: this.formData.lastname.value
    };
    this.authService.registerUser(new User(data), this.formData.password.value).then((response) => {
      console.log(response);
      this.globalService.setLoading(false);
      if (response && response.getId()){
        this.router.navigate([`/home`]);
     }
    });
  }

}
