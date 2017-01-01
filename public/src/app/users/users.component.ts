import { Component, OnInit } from '@angular/core';
import { UsersService } from './';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent {
  private users = [];
  constructor(private _usersService: UsersService) {
  }

  ngOnInit() {
    this._usersService.getUsers().subscribe(response => {
      this.users = response;
    });
  }
}
