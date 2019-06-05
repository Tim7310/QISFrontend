import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Global } from '../global.variable';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { transaction } from './service.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http  : HttpClient, 
    public  ehs   : ErrorService,
    private global: Global
  ) { }

  getTransactions( type ): Observable<transaction[]>{
    return this.http.get<transaction[]>(this.global.url + "/" + type)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getOneTrans( type ): Observable<transaction>{
    return this.http.get<transaction>(this.global.url + "/" + type)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }
  
  addTrans(trans: transaction): Observable<transaction> {
    return this.http.post<transaction>(
      this.global.url + "/addPatient", 
      trans, this.global.httpOptions)
      .pipe(
        retry(1),
        catchError(this.ehs.handleError)
      );
  } 
}
