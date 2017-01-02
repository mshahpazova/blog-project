import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { CommentService } from './comment.service';

@Component({
  selector: 'comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment;
  @Input() isReply = false;
  private isReplyClicked = false;
  private replyText = '';
  private replies = [];
  constructor(private commentService: CommentService) { }

  ngOnInit() {}

  showReplies() {
    this.commentService.getReplies(this.comment.id)
      .subscribe(replies => this.replies = replies);
  }

  showReplyBox() {
    this.isReplyClicked = !this.isReplyClicked;
  }

  reply(replyText) {
    this.commentService.reply(this.comment.id, replyText)
      .subscribe(reply => {
        this.replyText = '';
        this.replies.unshift(reply);
      });
  }
}
