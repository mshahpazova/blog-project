import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
// import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
// importU { UsernameValidators } from './usernameValidators';

@Component({
  selector: 'sign-in',
  templateUrl: './signin-form.component.html'
  //  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class SignInFormComponent {
  public signinForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private authenticationService: AuthenticationService,
    public fb: FormBuilder, private router: Router) {
  }

  signin() {
    this.authenticationService.signinUser(this.signinForm.value)
      .subscribe(response => {
        this.authenticationService.currentUser = response;
        this.router.navigate(['/']);
      });
  }
}
