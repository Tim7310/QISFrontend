import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Global } from '../global.variable';
import { Observable } from 'rxjs';
import { microscopy, medtech, hematology, chemistry } from './service.interface';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  constructor(
    private http: HttpClient, 
    public ehs: ErrorService,
    private global: Global
  ) { }

  getMedtech():Observable<medtech[]>{
    return this.http.get<medtech[]>( this.global.url+"/getPersonnelDep/LAB" )
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getPersonnel( id: number):Observable<medtech[]>{
    return this.http.get<medtech[]>( this.global.url+"/getPersonnel/" + id )
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  addMedtech(form: medtech): Observable<any>{
    return this.http.post<any>(
      this.global.url + "/addPersonnel",
      form, this.global.httpOptions)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getMicroscopy(id:any = ""):Observable<microscopy[]>{
    return this.http.get<microscopy[]>(this.global.url + "/getmicroscopy/" + id)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  addMicroscopy(form: microscopy, url = "/addMicroscopy"): Observable<any>{
    return this.http.post<any>(
      this.global.url + url ,
      form, this.global.httpOptions)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getHematology(id:any = ""):Observable<hematology[]>{
    return this.http.get<hematology[]>(this.global.url + "/getHema/" + id)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  addHematology(form: hematology, url = "/addHematology"): Observable<any>{
    return this.http.post<any>(
      this.global.url + url ,
      form, this.global.httpOptions)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getChemistry(id: any = ""): Observable<chemistry[]>{
    return this.http.get<chemistry[]>(this.global.url + "/getChemistry/" + id)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  addChemistry(form : chemistry, url = "/addChemistry"): Observable<any>{
    return this.http.post<any>(
      this.global.url + url ,
      form, this.global.httpOptions)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }
}
