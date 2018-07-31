import { Injectable } from '@angular/core';
import { Boat } from './boat-interface';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const { BASEURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  showBoatForm = false;
  options: object = {withCredentials: true};

  constructor(private http: Http) { }

  addBoat(newBoat: Boat): Observable<Boat>{
    console.log("Añadiendo barco")
    return this.http.post(`${BASEURL}/api/boats`, newBoat, this.options).pipe(
      map ( (res: Response) => {
        console.log("añadiendo")
        console.log(res.json())
        return res.json();
      }),
      catchError(e=>of(this.errorHandler(e)))
    )
  }

  errorHandler(e){
    console.log("BoatServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }

}
