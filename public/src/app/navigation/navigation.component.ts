import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation',
  styles: [`
  `],
  templateUrl: './navigation.component.html'
})

export class NavigationComponent implements OnInit {
  // TODO: why these dont work
  private currentUser;
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    // TODO: why these dont work
    // this.currentUser = this.authenticationService.currentUser;
    // console.log(this.currentUser.username);
  }

  ngOnInit() {
    // TODO: why these dont work
    // this.currentUser = this.authenticationService.currentUser;
  }

  signout() {
    this.authenticationService.signout().subscribe(user => {
      this.authenticationService.currentUser = {};
      this.router.navigate(['/signin']);
      // window.location.reload();
    });
  }
}
