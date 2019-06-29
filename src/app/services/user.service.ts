import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Global } from '../global.variable';
import { Observable } from 'rxjs';
import { patient, user } from './service.interface';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http  : HttpClient, 
    public  ehs   : ErrorService,
    private global: Global
    ) { }

    getUsers(): Observable<user[]>{
      return this.http.get<user[]>(this.global.url + "/getUsers")
      .pipe(
          retry(1),
          catchError(this.ehs.handleError)
      )
    }  
    getUser(type: number): Observable<user>{
      return this.http.get<user>(this.global.url + "/getUser/" + type)
      .pipe(
          retry(1),
          catchError(this.ehs.handleError)
      )
    }  
}
