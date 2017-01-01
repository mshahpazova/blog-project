import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { PostsService } from './';
import { CommentService } from '../comments/comment.service';

@Component({
  selector: 'post-details',
  templateUrl: 'post-details.component.html',
  providers: [PostsService, CommentService],
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  private post = {};
  private newCommentText: String;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap(params => this.postsService.getPost(params['id']))
      .subscribe(post => this.post = post);
  }

  createComment(text) {
    this.commentService.create(this.post['id'], text)
      .subscribe(comment => {
        this.post['comments'].push(comment);
        this.newCommentText = '';
      });
  }
}
