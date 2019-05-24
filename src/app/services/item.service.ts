import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { itemList } from './service.interface';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Global } from '../global.variable';

@Injectable()
export class ItemService {

  constructor(
    private http: HttpClient, 
    public ehs: ErrorService,
    private global: Global
  ) { }
  
  getItem(type: string): Observable<itemList[]>{
    return this.http.get<itemList[]>(this.global.url+"/"+type)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }    
}