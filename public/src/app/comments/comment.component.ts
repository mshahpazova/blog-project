import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment;
  constructor() { }

  ngOnInit() {}
}
