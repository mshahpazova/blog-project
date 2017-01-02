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
  private commentsUrl = 'http://localhost:3000/api/comments';
  // GET api/comments/:parentId/replies
  constructor(private http: Http) { }
  create(postId, text) {
    return this.http.post(`${this.postUrl}/${postId}/comments`, { text }, this.options)
    .map(res => res.json());
  }

  getReplies(commentId){
    return this.http.get(`${this.commentsUrl}/${commentId}/replies`, this.options)
    .map(res => res.json());
  }

  reply(commentId, text) {
    return this.http.post(`${this.commentsUrl}/${commentId}/replies`, { text }, this.options)
    .map(res => res.json());
  }
}
