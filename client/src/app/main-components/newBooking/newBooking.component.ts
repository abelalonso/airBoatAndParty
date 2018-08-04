
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
  startDate: Date;
  endDate: Date;
  @Input() boat;
  newBooking: Booking;
  totalPrice: number;

  constructor(private bookingService: BookingService, private sessionService: SessionService, private router: Router) { }

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
    console.log("primero")
    $('.fc-day').ready(()=>{
      console.log("cargado")
    })
  }

  showBookingForm(){
    this.bookingService.showBookingForm = true;
    this.bookingService.showBookingButton = false;
    this.endDate = null;
    this.startDate = null;
    console.log("segundo");
 
  }

  cancel() {
    this.bookingService.showBookingForm = false;
    this.bookingService.showBookingButton = true;
    this.startDate = null;
    this.endDate = null;
  }

  initialCalendar(){
    console.log("calendario ok");
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
    let pickedDate=new Date(data.date._d);
    
    var isPicked = false;
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
      if(!this.startDate){
        this.startDate = data.date._d;
        this.markDay(this.startDate, "Inicio", "green");
      } else {
        isPicked = false;
        this.boat.bookings.forEach(e => {
          let date = new Date(e.startDate);
          let endDate = new Date(e.endDate);
          while ((date<=endDate) && (!isPicked)){
            if ((this.startDate.getTime()<date.getTime()) && (date.getTime()<pickedDate.getTime())){
              isPicked = true;
              console.log("pillada");
            }
            date.setDate(date.getDate()+1);
          }
        });
        if (!isPicked){
          this.endDate = data.date._d
          this.markDay(this.endDate, "Fin", "green");
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
      $( `td[data-date='${date}']` ).css({"background-color": color, "text-align": "center", padding: "20px 0"}).text(text)
    } else {
      $( `td[data-date='${date}']` ).css({"background-color": color})
    }
  }

  addBooking(use: string){
    this.newBooking = {
      startDate: this.startDate, 
      endDate: this.endDate,
      user: this.sessionService.user._id,
      boat: this.boat._id,
      totalPrice: 2000,
      shoppingCart: null,
      use,
      //totalPrice: 
    }
    this.newBooking.totalPrice = (1 + Math.ceil((this.newBooking.endDate.getTime() - 
    this.newBooking.startDate.getTime())/
    (1000*24*60*60)))*this.boat.pricePerDay;
    this.bookingService.showBookingForm = false;
    this.bookingService.showBookingButton = true;
    this.bookingService.addBooking(this.newBooking).subscribe(()=>{
      this.router.navigate(['/profile']);
    })
  }
}
