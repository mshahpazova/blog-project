import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {
  private _postsUrl = process.env.API_URL + '/api/posts';
  private usersUrl = process.env.API_URL + '/api/users';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({
    headers: this.headers,
    withCredentials: true
  });
  constructor(private _http: Http) {
  }

  getPosts() {
    return this._http.get(this._postsUrl, this.options).map(res => res.json());
  }

  getPost(postId) {
    return this._http.get(`${this._postsUrl}/${postId}`, this.options).map(res => res.json());
  }

  getUserPosts(userId) {
    return this._http.get(`${this.usersUrl}/${userId}/posts`, this.options)
      .map(res => res.json());
  }

  createPost(post): Observable<any> {
    return this._http
      .post(this._postsUrl, post, this.options)
      .map(res => res.json());
  }
}
