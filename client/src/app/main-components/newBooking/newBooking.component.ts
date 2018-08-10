
import { BookingService } from '../booking.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { SessionService } from '../../session/session.service';
import { Booking } from '../booking-interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-newBooking',
  templateUrl: './newBooking.component.html',
  styleUrls: ['./newBooking.component.scss']
})
export class NewBookingComponent implements OnInit {

  //matDatepicker;
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  @Input() boat;
  newBooking: Booking;


  constructor(public bookingService: BookingService, public sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      }//,      events: data
    };
  }

  showBookingForm(){
    if (!this.sessionService.user){
      this.router.navigate(['/signup']);
    }
    this.bookingService.showBookingForm = true;
    this.bookingService.showBookingButton = false;
    this.bookingService.endDate = null;
    this.bookingService.startDate = null;
  }

  cancel() {
    this.bookingService.showBookingForm = false;
    this.bookingService.showBookingButton = true;
    this.bookingService.startDate = null;
    this.bookingService.endDate = null;
  }
  clickButton(){
    this.initialCalendar();
  }

  initialCalendar(){
    this.boat.bookings.forEach(e => {
      let date=new Date(e.startDate);
      let endDate=new Date(e.endDate);
      while (date<=endDate){
        this.markDay(date, null, "red");
        date.setDate(date.getDate()+1);
      }
    });
  }

  updateEvent(data){
    var isPicked = false;
    let pickedDate=new Date(data.date._d);
    if(pickedDate<new Date()){
      isPicked=true;
    }

    this.boat.bookings.forEach(e => {
      let date = new Date(e.startDate);
      let endDate = new Date(e.endDate);
      while ((date<=endDate) && (!isPicked)){
        if (date.getTime()==pickedDate.getTime()){
          isPicked = true;
        }
        date.setDate(date.getDate()+1);
      }
    });

    if (!isPicked){
      if(!this.bookingService.startDate){
        console.log("establece start date")
        this.bookingService.startDate = data.date._d;
        this.markDay(this.bookingService.startDate, "Inicio", "green");
        this.bookingService.totalPrice=this.boat.pricePerDay;
      } else {
        isPicked = false;
        this.boat.bookings.forEach(e => {
          let date = new Date(e.startDate);
          let endDate = new Date(e.endDate);
          while ((date<=endDate) && (!isPicked)){
            if ((this.bookingService.startDate.getTime()<date.getTime()) && (date.getTime()<pickedDate.getTime())){
              isPicked = true;
            }
            date.setDate(date.getDate()+1);
          }
        });

        //check that endDate is after startDate and you only pick 2 dates
        if(data.date._d.getTime()<this.bookingService.startDate.getTime() || this.bookingService.endDate){
          isPicked=true;
        }
        if (!isPicked){
          this.bookingService.endDate = data.date._d
          this.markDay(this.bookingService.endDate, "Fin", "green");
          this.bookingService.disableConfirmationButton = false;
          this.bookingService.totalPrice = (1 + Math.ceil((this.bookingService.endDate.getTime() - 
          this.bookingService.startDate.getTime())/
          (1000*24*60*60)))*this.boat.pricePerDay;
          let date = new Date(this.bookingService.startDate)

          while (date<this.bookingService.endDate){
            this.markDay(date, null, "green");
            date.setDate(date.getDate()+1);
          }
        }
      }
    }
  }

  markDay(markDate:Date, text: string, color: string){
    let day:any = markDate.getDate();
    if (day<10) { day="0"+day}
    let month:any = markDate.getMonth()+1;
    if (month<10) { month="0"+month}
    let date=`${markDate.getFullYear()}-${month}-${day}`
    if(text){
      $( `td[data-date='${date}']` ).css({"background-color": color, "text-align": "center"}).text(text)
    } else {
      $( `td[data-date='${date}']` ).css({"background-color": color})
    }
  }

  addBooking(use: string){
    this.newBooking = {
      startDate: this.bookingService.startDate, 
      endDate: this.bookingService.endDate,
      user: this.sessionService.user._id,
      boat: this.boat._id,
      totalPrice: this.bookingService.totalPrice,
      shoppingCart: null,
      use,
      //totalPrice: 
    }
    this.bookingService.showBookingForm = false;
    this.bookingService.showBookingButton = true;
    this.bookingService.addBooking(this.newBooking).subscribe(()=>{
      this.bookingService.disableConfirmationButton = true;
      this.router.navigate(['/profile']);
    })
  }
}
