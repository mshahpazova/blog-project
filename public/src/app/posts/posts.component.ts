import { Component, OnInit } from '@angular/core';
import { PostsService } from './';
import { CommentService } from '../comments/comment.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  providers: [PostsService, CommentService]
})
export class PostsComponent {
    private posts = [];
    constructor(
      private postsService: PostsService,
      private commentService: CommentService)
    {}

    ngOnInit() {
      this.postsService.getPosts().subscribe(response => {
        this.posts = response;
      });
    }
}
