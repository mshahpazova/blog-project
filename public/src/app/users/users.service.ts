import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  private _signupUserUrl = process.env.API_URL + '/authentication/signup';
  private _signinUserUrl = process.env.API_URL + '/authentication/signin';
  private usersUrl = process.env.API_URL + '/api/users';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private requestOptions = new RequestOptions({
    headers: this.headers,
    withCredentials: true
  });
  constructor(private http: Http) { }

  getUsers() {
    console.log('GAGAGA');
    return this.http.get(this.usersUrl, this.requestOptions).map(res => res.json());
  }

  getUser(id) {
    return this.http.get(`${this.usersUrl}/${id}`, this.requestOptions)
    .map(res => res.json());
  }

  updateUser(id, data) {
    return this.http.put(`${this.usersUrl}/${id}`, data, this.requestOptions)
    .map(res => res.json());
  }
}
