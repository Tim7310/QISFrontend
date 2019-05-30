import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { patient } from './service.interface';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Global } from '../global.variable';

@Injectable()
export class PatientService {

    constructor(
        private http  : HttpClient, 
        public  ehs   : ErrorService,
        private global: Global
      ) { }
  
  getPatient(type: string): Observable<patient[]>{
    return this.http.get<patient[]>(this.global.url +"/"+type)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }  
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  addPatient (patient: patient): Observable<patient> {
    return this.http.post<patient>(this.global.url + "/addPatient", patient, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.ehs.handleError)
      );
  }  
}