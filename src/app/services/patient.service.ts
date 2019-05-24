import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { patient } from './service.interface';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Global } from '../global.variable';

@Injectable()
export class PatientService {

    constructor(
        private http: HttpClient, 
        public ehs: ErrorService,
        private global: Global
      ) { }
  
  getPatient(type: string): Observable<patient[]>{
    return this.http.get<patient[]>(this.global.url +"/"+type)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }    
}