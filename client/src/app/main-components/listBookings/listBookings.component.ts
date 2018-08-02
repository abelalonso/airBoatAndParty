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

  constructor(private bookingService: BookingService, private sessionService: SessionService) { }

  ngOnInit() {
    console.log("usuario", this.sessionService.user._id);
    console.log("barco", this.boat);
    this.bookingService.getBookings(this.sessionService.user._id, this.boat._id).subscribe( bookings => {
      this.bookings = bookings;
    });
  }

}
