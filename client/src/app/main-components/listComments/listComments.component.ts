import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Comment } from '../comment-interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listComments',
  templateUrl: './listComments.component.html',
  styleUrls: ['./listComments.component.scss']
})
export class ListCommentsComponent implements OnInit {

  bookingId: string;
  comments: Array<Comment>

  constructor(private commentService: CommentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.bookingId=params['id']
      this.commentService.getComments(this.bookingId).subscribe((comments: Array<Comment>)=>{
        console.log("comentarios", comments)
        this.comments=comments;
      })
    });
  }

  update(){

  }

}
