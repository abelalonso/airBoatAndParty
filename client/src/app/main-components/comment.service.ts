import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Comment } from './comment-interface';
import { map, catchError } from 'rxjs/operators';


const { BASEURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  options:object = {withCredentials: true}; 
  showCommentForm = false;

  constructor(private http: Http) { }

  getComments(bookingId: string): Observable <Array<Comment>>{
    return this.http.get(`${BASEURL}/api/comments/${bookingId}`, this.options).pipe(
      map((res: any) => {
        return res.json();
      }),
      catchError(e=>of(this.errorHandler(e)))
    )
  }

  errorHandler(e){
    console.log("CommentServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }

}
