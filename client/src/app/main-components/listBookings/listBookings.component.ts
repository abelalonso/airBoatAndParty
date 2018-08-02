import { Component, OnInit, Input } from '@angular/core';
import { BookingService } from '../booking.service';
import { SessionService } from '../../session/session.service';

@Component({
  selector: 'app-listBookings',
  templateUrl: './listBookings.component.html',
  styleUrls: ['./listBookings.component.scss']
})
export class ListBookingsComponent implements OnInit {

  bookings;
  @Input() userId;
  @Input() boatId;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    console.log(`User ${this.userId} boat ${this.boatId}`)
    this.bookingService.getBookings(this.userId, this.boatId).subscribe( bookings => {
      this.bookings = bookings;
    });
  }

}
