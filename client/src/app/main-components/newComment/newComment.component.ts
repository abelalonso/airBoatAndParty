import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment-interface';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-newComment',
  templateUrl: './newComment.component.html',
  styleUrls: ['./newComment.component.scss']
})
export class NewCommentComponent implements OnInit {

  showCommentForm = false;
  newComment: Comment = {
    rate: 0,
    content: ''
  };

  @Input() boatId;
  @Input() bookingId;

  constructor(public commentService: CommentService) { }

  ngOnInit() {
  }

  addComment(newComment: Comment){
    newComment.boat = this.boatId;
    newComment.booking = this.bookingId;
    console.log(newComment)
    this.showCommentForm=false;
    this.commentService.addComment(newComment).subscribe()
  }

}
