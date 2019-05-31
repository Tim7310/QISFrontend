import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { itemList, company } from './service.interface';
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
  //  get item list
  getItem(type: string): Observable<itemList[]>{
    return this.http.get<itemList[]>(this.global.url+"/"+type)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }
  //  get company list
  getCompany(type: string): Observable<company[]>{
    return this.http.get<company[]>(this.global.url+"/"+type)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }   
  getCompanyByID(id: number): Observable<company>{
    return this.http.get<company>(this.global.url+"/getCompany/"+ id)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }   
}