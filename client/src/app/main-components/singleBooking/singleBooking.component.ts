import { Component, OnInit, Input } from '@angular/core';
import { BookingService } from '../booking.service';
import { ActivatedRoute } from '@angular/router';
import { Booking } from '../booking-interface';
import { SessionService } from '../../session/session.service';
import { CommentService } from '../comment.service';
import { StationService } from '../station.service';

@Component({
  selector: 'app-singleBooking',
  templateUrl: './singleBooking.component.html',
  styleUrls: ['./singleBooking.component.scss']
})
export class SingleBookingComponent implements OnInit {

  bookingId: string;
  booking: Booking;
  @Input() boat;
  @Input() userId;
  thisBoat;
  station;
  showLinks=false;
  showInfo=false;
  tomorrowWeather;
  soonWeather;

  constructor(public bookingService: BookingService, private route: ActivatedRoute, public sessionService: SessionService, private commentService: CommentService, private stationService: StationService) { }

  ngOnInit() {
    this.sessionService.isLogged().subscribe((user)=>{
      this.userId = user._id;
      this.route.params.subscribe(params=>{
        this.bookingId=params['id'];
        this.bookingService.getOneBooking(this.bookingId).subscribe((booking)=>{
          this.thisBoat = booking.boat;
          this.booking = booking;
        })
      })
    })
  }

  showCommentForm(){
    this.commentService.showCommentForm = true;
  }

  getWeather(){
    this.stationService.getOneStation(this.thisBoat.station).subscribe(station=>{
      this.station=station
      this.stationService.getWeather(this.station.code).subscribe(links=>{
        this.tomorrowWeather = links["tomorrowInfo"];
        this.soonWeather = links["soonInfo"];       
      });
    })
  }

  update(){
    this.commentService.getComments(this.bookingId).subscribe()
  }
}