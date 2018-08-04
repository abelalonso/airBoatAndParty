import { Component, OnInit, Input } from '@angular/core';
import { BookingService } from '../booking.service';
import { ActivatedRoute } from '@angular/router';
import { Booking } from '../booking-interface';

@Component({
  selector: 'app-singleBooking',
  templateUrl: './singleBooking.component.html',
  styleUrls: ['./singleBooking.component.scss']
})
export class SingleBookingComponent implements OnInit {

  bookingId: String;
  booking: Booking;
  @Input() boat;
  @Input() user;

  constructor(private bookingService: BookingService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.bookingId=params['id'];
      this.bookingService.getBookings(this.user, this.boat).subscribe(()=> 
        this.booking = this.bookingService.bookings.filter(e=>e._id==this.bookingId)[0])
    })
  }
}
