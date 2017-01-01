import { Component, OnInit } from '@angular/core';
import { PostsService } from './';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'user-posts',
  templateUrl: 'user-posts.component.html',
  providers: [PostsService]
})
export class UserPostsComponent implements OnInit {
  private posts = [];
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) { }

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap(params => this.postsService.getUserPosts(params['userId']))
      .subscribe(posts => this.posts = posts);
  }
}
