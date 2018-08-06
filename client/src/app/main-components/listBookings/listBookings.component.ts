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
  @Input() boat = {_id: ""};

  constructor(public bookingService: BookingService, public sessionService: SessionService) { }

  ngOnInit() {
    this.bookingService.getBookings(this.sessionService.user._id, this.boat._id).subscribe( bookings => {
      this.bookings = bookings;
    });
  }

}
