import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from './';
import 'rxjs/add/operator/switchMap';
import { AuthenticationService } from '../shared/authentication.service'
@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  providers: [UsersService]
})
export class UserComponent implements OnInit {
  private user = {};
  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap(params => this.usersService.getUser(params['id']))
      .subscribe(user => this.user = user);
  }

  get isCurrent() {
    let { currentUser } = this.authenticationService;
    return currentUser['id'] === this.user['id'];
  }
}
