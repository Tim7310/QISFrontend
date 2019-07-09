import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Global } from '../global.variable';
import { Observable } from 'rxjs';
import { patient, user } from './service.interface';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Md5} from "md5-typescript";

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

    getUserByName(type: string): Observable<user[]>{
      return this.http.get<user[]>(this.global.url + "/getUserName/" + type)
      .pipe(
          retry(1),
          catchError(this.ehs.handleError)
      )
    }  

    checkUser(userName: any, password: any):Observable<any>{
    const observ = new Observable(observer => {
      this.getUserByName(userName).subscribe( user => {
        let priv = {
          isUser: 0,
          isPass: 0,
        }
        if( user.length == 1 ){
          priv.isUser = 1;         
          if(Md5.init(password) == user[0].userPass){
            priv.isPass = 1;
          }
        }
        observer.next(priv);
      })
    })
     return observ;
    }
}
