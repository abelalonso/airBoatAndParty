import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-newBooking',
  templateUrl: './newBooking.component.html',
  styleUrls: ['./newBooking.component.scss']
})
export class NewBookingComponent implements OnInit {

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
  }

  showBookingForm(){
    this.bookingService.showBookingForm = true;
  }

  cancel() {
    this.bookingService.showBookingForm = false;
  }

  addBooking(){

  }
}
