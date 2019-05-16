import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { itemList } from './service.interface';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ItemService {
readonly url: string = "http://localhost:8086";

  constructor(private http: HttpClient) { }
  
  getItem(type: string): Observable<itemList[]>{
    return this.http.get<itemList[]>(this.url+"/"+type)
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
    } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
    }
    
}