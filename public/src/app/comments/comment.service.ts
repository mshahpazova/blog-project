import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CommentService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({
    headers: this.headers,
    withCredentials: true
  });
  private postUrl = 'http://localhost:3000/api/posts';
  constructor(private http: Http) { }
  create(postId, text) {
    return this.http.post(`${this.postUrl}/${postId}/comments`, { text }, this.options)
    .map(res => res.json());
  }
}
