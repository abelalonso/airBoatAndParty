import { Injectable, Input } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Booking } from './booking-interface';
import { map, catchError } from 'rxjs/operators';

const { BASEURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  showBookingForm:boolean = false;
  showBookingButton = true;
  disableConfirmationButton = true;
  showCommentForm = false;
  bookings: Array<Booking>;
  options:object = {withCredentials: true}; 
  @Input() userId: string;
  @Input() boatId: string;

  constructor(public http: Http) { }

  getBookings(userId: string, boatId: string): Observable<Array<Booking>>{
    if (!boatId){
      return this.http.get(`${BASEURL}/api/booking/user/${userId}`, this.options).pipe(
        map( (res: any) => {
          this.bookings = res.json();
          return res.json();
        }),
        catchError(e=>of(this.errorHandler(e)))
      )
    }
    return this.http.get(`${BASEURL}/api/booking/boat/${boatId}`, this.options).pipe(
      map( (res: any) => {
        this.bookings = res.json();
        return res.json();
      }),
      catchError(e=>of(this.errorHandler(e)))
    )
  }

  addBooking(newBooking: Booking): Observable<Booking>{
    return this.http.post(`${BASEURL}/api/booking/boat/${newBooking.boat}`, newBooking, this.options).pipe(
      map( (res: Response) => {
        return res.json();
      }),
      catchError( e=>of(this.errorHandler(e)))
    )
  }

  getOneBooking(bookingId): Observable<Booking>{
    return this.http.get(`${BASEURL}/api/booking/${bookingId}`).pipe(
      map((res: Response)=>{
        return res.json();
      }),
      catchError(e=>of(this.errorHandler(e)))
    )

  }

  errorHandler(e){
    console.log("BookingServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }
}
