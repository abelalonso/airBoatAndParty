import { Component, OnInit, Input } from '@angular/core';
import { BookingService } from '../booking.service';
import { ActivatedRoute } from '@angular/router';
import { Booking } from '../booking-interface';
import { SessionService } from '../../session/session.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-singleBooking',
  templateUrl: './singleBooking.component.html',
  styleUrls: ['./singleBooking.component.scss']
})
export class SingleBookingComponent implements OnInit {

  bookingId: String;
  booking: Booking;
  @Input() boat;
  @Input() userId;

  constructor(public bookingService: BookingService, private route: ActivatedRoute, public sessionService: SessionService, private commentService: CommentService) { }

  ngOnInit() {
    this.sessionService.isLogged().subscribe((user)=>{
      this.userId = user._id;
      this.route.params.subscribe(params=>{
        this.bookingId=params['id'];
        this.bookingService.getBookings(this.userId, this.boat).subscribe(()=> 
          this.booking = this.bookingService.bookings.filter(e=>e._id==this.bookingId)[0])
      })
    })
  }

  showCommentForm(){
    this.commentService.showCommentForm = true;
  }
}