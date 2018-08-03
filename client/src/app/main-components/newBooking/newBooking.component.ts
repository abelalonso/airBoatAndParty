
import { BookingService } from '../booking.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { SessionService } from '../../session/session.service';
import { Booking } from '../booking-interface';


@Component({
  selector: 'app-newBooking',
  templateUrl: './newBooking.component.html',
  styleUrls: ['./newBooking.component.scss']
})
export class NewBookingComponent implements OnInit {

  //matDatepicker;
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  startDate: Date;
  endDate: Date;
  @Input() boat;
  newBooking: Booking;
  totalPrice: number;

  constructor(private bookingService: BookingService, private sessionService: SessionService) { }

  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      }//,      events: data
    };
  }

  showBookingForm(){
    this.bookingService.showBookingForm = true;
    this.bookingService.showBookingButton = false;
    this.endDate = null;
    this.startDate = null;
  }

  cancel() {
    this.bookingService.showBookingForm = false;
    this.bookingService.showBookingButton = true;
    this.startDate = null;
    this.endDate = null;
  }

  updateEvent(data){
/*     console.log(data.jsEvent.target.style);
    data.jsEvent.target.style={"background": "red"} */
    if(!this.startDate){
      this.startDate = data.date._d;
    } else {
      this.endDate = data.date._d
    }
  }


  addBooking(use: string){
    this.newBooking = {
      startDate: this.startDate, 
      endDate: this.endDate,
      user: this.sessionService.user._id,
      boat: this.boat._id,
      totalPrice: 100,
      shoppingCart: null,
      use,
      //totalPrice: 
    }
    this.totalPrice = Math.ceil((this.newBooking.endDate.getTime() - 
                      this.newBooking.startDate.getTime())/
                      (1000*24*60*60)*this.boat.pricePerDay);
this.bookingService.showBookingForm = false;
    this.bookingService.showBookingButton = true;
    this.bookingService.addBooking(this.newBooking).subscribe()
  }
}
