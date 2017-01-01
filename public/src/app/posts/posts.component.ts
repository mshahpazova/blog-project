import { Component, OnInit } from '@angular/core';
import { PostsService } from './';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  providers: [PostsService]
})
export class PostsComponent {
    private posts = [];
    constructor(private postsService: PostsService) {
    }

    ngOnInit() {
      this.postsService.getPosts().subscribe(response => {
        this.posts = response;
      });
    }
}
