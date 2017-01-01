import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { PostsService } from './';
// import { UsernameValidators } from './usernameValidators';
@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  providers: [PostsService]
})
export class PostFormComponent {
  public createPostForm = this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required]
  });

  constructor(
    private _postsService: PostsService,
    public fb: FormBuilder
  ) { }

  createPost(event) {
    this._postsService.createPost(this.createPostForm.value)
      .subscribe(x => console.log("This is what comes from the postServiceobservable", x));
  }
}