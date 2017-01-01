import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { UsersService } from './';

@Component({
  selector: 'edit-user',
  templateUrl: './user-edit.component.html',
  providers: [UsersService]
})
export class UserEditComponent {
  public editForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required]
  });

  constructor(
    public fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private usersService: UsersService
  ) {
  }

  edit() {
    let id = this.authenticationService.currentUser['id'];
    this.usersService.updateUser(id, this.editForm.value)
    // TODO: add a modale
    .subscribe(() => alert('U have successfully updated your profile'));
  }
}

