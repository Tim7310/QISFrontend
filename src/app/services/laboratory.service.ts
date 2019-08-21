import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Global } from '../global.variable';
import { Observable } from 'rxjs';
import { microscopy } from './service.interface';
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

  getMicroscopy(id = ""):Observable<microscopy[]>{
    return this.http.get<microscopy[]>(this.global.url+"/getmicroscopy/"+id)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  addMicroscopy(form: microscopy): Observable<any>{
    return this.http.post<any>(
      this.global.url+"/addMicroscopy",
      form, this.global.httpOptions)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }
}
