import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { itemList } from './service.interface';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable()
export class ItemService {
readonly url: string = "http://localhost:8086";

  constructor(private http: HttpClient, public ehs: ErrorService) { }
  
  getItem(type: string): Observable<itemList[]>{
    return this.http.get<itemList[]>(this.url+"/"+type)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }    
}