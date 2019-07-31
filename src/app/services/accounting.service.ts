import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Global } from '../global.variable';
import { Observable } from 'rxjs';
import { billing, accPayment, personnel } from './service.interface';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor(
    private http: HttpClient, 
    public ehs: ErrorService,
    private global: Global
  ) { }

  getBilling(): Observable<billing[]>{
    return this.http.get<billing[]>(this.global.url+"/bilList")
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getBil(id: number, type: number = 0): Observable<billing[]>{
    // get by billing ID
    let foo : string = "/bilID/";
    if(type == 1){
      // get by company id
      foo = "/bilList/";
    }else if(type == 2){
      //  get by SOA code
      foo = "/bilSC/";
    }
    return this.http.get<billing[]>(this.global.url + foo + id)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getPersonnel(id: any = ""): Observable<personnel[]>{
    return this.http.get<personnel[]>(this.global.url + "/getPersonnel/" + id)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getPersonnelDep(type: string): Observable<personnel[]>{
    return this.http.get<personnel[]>(this.global.url + "/getPersonnelDep/" + type)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  addBilling(bill: billing, type: number = 0): Observable<any>{
    let foo : string = "/addBil";
    if(type == 1){
      foo = "/updateBil";
    }
    return this.http.post<any>(
      this.global.url + foo,
      bill, this.global.httpOptions)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getAccPay(): Observable<accPayment[]>{
    return this.http.get<accPayment[]>(this.global.url+"/accList")
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getAcc(id: number, type: number = 0): Observable<accPayment[]>{
    // get by billing ID
    let foo : string = "/accID/";
    if(type == 1){
    // get by transaction id
      foo = "/accTID/";
    }else if(type == 2){
    // get by biller ID
      foo = "/accBID/";
    }else if(type == 3){
    // get by company ID
      foo = "accCID";
    }
    return this.http.get<accPayment[]>(this.global.url + foo + id)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  addAccPayment(acc: accPayment, type: number = 0): Observable<any>{
    let foo : string = "/addAcc";
    if(type == 1){
      foo = "/updateAcc";
    }
    return this.http.post<any>(
      this.global.url + foo,
      acc, this.global.httpOptions)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  

}

