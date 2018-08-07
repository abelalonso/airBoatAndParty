import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../comment-interface';
import { CommentService } from '../comment.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';



const { BASEURL } = environment;

@Component({
  selector: 'app-newComment',
  templateUrl: './newComment.component.html',
  styleUrls: ['./newComment.component.scss']
})
export class NewCommentComponent implements OnInit {

  uploader: FileUploader = new FileUploader ({
    url: `${BASEURL}/api/comments`,
    method: 'POST'
  });
  feedback;

  showCommentForm = false;
  newComment: Comment = {
    rate: 0,
    content: ''
  };

  @Input() boatId;
  @Input() bookingId;
  @Output() onUpdateComments = new EventEmitter();

  constructor(public commentService: CommentService) { }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  addComment(newComment: Comment){
    newComment.boat = this.boatId;
    newComment.booking = this.bookingId;
    this.showCommentForm=false;
    if((this.uploader._nextIndex==0) && (this.uploader.queue.length==0)){
      this.commentService.addComment(newComment).subscribe( () => this.onUpdateComments.emit())
    } else {
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('boat', newComment.boat);
        form.append('booking', newComment.booking);
        form.append('content', newComment.content);
        form.append('rate', newComment.rate);
      };
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = () => {
        this.onUpdateComments.emit();
      }
    }
  }
}
