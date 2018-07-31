import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Http, Response } from '@angular/http';
import { User } from './User-interface';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'


const { BASEURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user: User;
  options: object = {withCredentials: true};

  constructor(private http: Http) {
    this.isLogged().subscribe();
  }

  signup(newUser): Observable<User>{
    return this.http.post(`${BASEURL}/api/auth/signup`, newUser, this.options).pipe(
      map( (res: Response) => {
        let data = res.json();
        this.user=data.user;
        return data.user;
      }),
      catchError(e => of(this.errorHandler(e)))
    )
  }

  login(username:string, password:string): Observable<User>{
    return this.http.post(`${BASEURL}/api/auth/login`,{username,password},this.options).pipe(
      map( (res:Response) => {
        let data = res.json();
        this.user = data;
        return data.user;
      }),
      catchError( e => of(this.errorHandler(e)))
    )
  }

  logout(){
    return this.http.get(`${BASEURL}/api/auth/logout`,this.options).pipe(
      map( (res:Response) => {
        this.user = null;
      }),
      catchError( e => of(this.errorHandler(e)))
    )
  }

  isLogged(){
    return this.http.get(`${BASEURL}/api/auth/currentuser`,this.options).pipe(
      map( (res:Response) => {
        this.user = res.json();
        console.log(`Automatically login ${this.user.username}`);
        return this.user;
      }),
      catchError(e => {console.log("You have to login first!"); return of(e)})
    );
  }

  errorHandler(e){
    console.log("SessionServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }
}
