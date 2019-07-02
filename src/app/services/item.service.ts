import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { itemList, company, packList, packExt } from './service.interface';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Global } from '../global.variable';

@Injectable()
export class ItemService {
  // itemType = ["CASH LAB", "CASH INDUSTRIAL", "CASH IMAGING", "ACCOUNT INDUSTRIAL", 
  //  "ACCOUNT HMO", "ACCOUNT SURGEON", "CASH SURGEON", "ACCOUNT PHARMACY", "CASH PHARMACY", 
  //  "CASH DNA", "CASH WLMC", "CASH PSYCH", "ACCOUNT PSYCH" ]
  itemType = ["ECG", "HOME SERVICE", "INSURANCE", "LABORATORY", "MEDICAL SERVICE", 
  "SUPPLY", "ULTRASOUND", "XRAY", "PHARMACY"];
  itemTest = [
    {value: 1, view: "X-Ray"},
    {value: 2, view: "Blood"},
    {value: 3, view: "Urine"},
    {value: 4, view: "Stool"},
    {value: 5, view: "Pysical Exam"},
    {value: 6, view: "Other Specimen"},
    {value: 7, view: "Ultrasound"},
    {value: 8, view: "ECG"},
    {value: 9, view: "Others"},
    {value: 10, view: "2D_Echo"}
  ]
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
  getItemByID(id: number): Observable<itemList>{
    return this.http.get<itemList>(this.global.url + "/AllItems/" + id)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  addItem(item: itemList): Observable<any>{
    return this.http.post<any>(
      this.global.url+"/addItem",
      item, this.global.httpOptions)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  updateItem(item: itemList): Observable<any>{
    return this.http.post<any>(
      this.global.url+"/updateItem",
      item, this.global.httpOptions)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  //  get Package list
  getPackage(type: string): Observable<packList[]>{
    return this.http.get<packList[]>(this.global.url+"/"+type)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getPack(name: string): Observable<packList>{
    return this.http.get<packList>(this.global.url + "/" + name)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getPackExt(name: string): Observable<packExt[]>{
    return this.http.get<packExt[]>(this.global.url + "/packext/" + name)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getPack_Test(item: itemList){
    var numArr: number[] = [];
    var _numArr: any;
    
  
        
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
  addCompany(company: company): Observable<company>{
    return this.http.post<company>(
      this.global.url+"/addCompany",
      company, this.global.httpOptions)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  } 
}