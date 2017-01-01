import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { PostsService } from './';

@Component({
  selector: 'post-details',
  templateUrl: 'post-details.component.html',
  providers: [PostsService]
})
export class PostDetailsComponent implements OnInit {
  private post = {};
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

ngOnInit() {
    this.route.params
      .switchMap(params => this.postsService.getPost(params['id']))
      .subscribe(post => this.post = post);
  }
}
