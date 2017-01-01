import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
// import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
// importU { UsernameValidators } from './usernameValidators';

@Component({
  selector: 'post-form',
  templateUrl: './sign-up-form.component.html'
  //  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class SignUpFormComponent {
  public signUpForm = this.fb.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required]
  });

  constructor(
    private _usersService: AuthenticationService,
    public fb: FormBuilder
  ) {
  }

  signup(event) {
    console.log(event);
    this._usersService.createUser(this.signUpForm.value)
      .subscribe(x => console.log(x));

    console.log(this.signUpForm.value);
  }
}
