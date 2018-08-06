import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { Station } from './station-interface';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

const {BASEURL} = environment;

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(public http: Http) { }

  getStations(): Observable<Array<Station>>{
    return this.http.get(`${BASEURL}/api/meteo`).pipe(
      map ((res: Response) => {

        return res.json();
      }),
      catchError(e=>of (this.errorHandler(e)))
    )
  }

  getOneStation(stationId): Observable<Station>{
    return this.http.get(`${BASEURL}/api/meteo/${stationId}`).pipe(
      map((res: Response) => {
        console.log(res.json())
        return res.json();
      }),
      catchError(e=>of(this.errorHandler(e)))
    )
  }

  getWeather(code): Observable<object>{
    return this.http.get(`${BASEURL}/api/meteo/info/${code}`).pipe(
      map((res: Response)=>{
        return res.json();
      }),
      catchError(e=>of(this.errorHandler(e)))
    )
  }
  
  errorHandler(e){
    console.log("StationServiceError");
    console.log(e.message);
    console.log (e);
    return e;
  }
}
