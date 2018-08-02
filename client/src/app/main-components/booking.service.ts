import { Injectable } from '@angular/core';
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
  bookings: Array<Booking>;
  options:object = {withCredentials: true}; 

  constructor(private http: Http) { }

  getBookings(userId: string, boatId: string): Observable<Array<Booking>>{
    if (!boatId){
      console.log(userId)
      return this.http.get(`${BASEURL}/api/booking/user/${userId}`, this.options).pipe(
        map( (res: any) => {
          console.log("listado de bookings por usuario", res.json())
          return res.json();
        }),
        catchError(e=>of(this.errorHandler(e)))
      )
    }
    return this.http.get(`${BASEURL}/api/booking/boat/${boatId}`, this.options).pipe(
      map( (res: any) => {
        console.log("Listado de bookings por barco", res.json())
        return res.json();
      }),
      catchError(e=>of(this.errorHandler(e)))
    )
  }

  addBooking(){
    
  }

  errorHandler(e){
    console.log("BookingServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }
}
