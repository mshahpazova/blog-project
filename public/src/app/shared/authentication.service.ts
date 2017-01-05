import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  public currentUser = {};
  private signupUserUrl = process.env.API_URL + '/authentication/signup';
  private signinUserUrl = process.env.API_URL + '/authentication/signin';
  private signoutUrl = process.env.API_URL + '/authentication/signout';
  private usersUrl = process.env.API_URL + '/api/users';
  private currentUserUrl = process.env.API_URL + '/authentication/current';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private requestOptions = new RequestOptions({
    headers: this.headers,
    withCredentials: true
  });
  constructor(private http: Http) {
    console.log(process.env);
    debugger;
    this.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  getCurrentUser() {
    return this.http.get(this.currentUserUrl, this.requestOptions)
      .map(res => res.json());
  }

  createUser(user): Observable<any> {
    return this.http
      .post(this.signupUserUrl, user, this.requestOptions)
      .map(res => res.json());
  }

  signinUser(signinForm){
     return this.http
      .post(this.signinUserUrl, signinForm, this.requestOptions)
      .map(res => res.json());
  }

  signout(): Observable<any> {
    this.currentUser = {};
    return this.http
      .post(this.signoutUrl, null, this.requestOptions);
  }
}
