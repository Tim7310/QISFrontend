import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Global } from '../global.variable';
import { Observable } from 'rxjs';
import { patient, user, priv } from './service.interface';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Md5} from "md5-typescript";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http  : HttpClient, 
    public  ehs   : ErrorService,
    private global: Global,
    private router: Router
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

    getUserPriv(id: number): Observable<priv>{
      return this.http.get<priv>(this.global.url + "/getPrivilege/" + id)
      .pipe(
          retry(1),
          catchError(this.ehs.handleError)
      )
    }  

    checkUser(userName: any, password: any, check: boolean = false):Observable<any>{
    const observ = new Observable(observer => {
      this.getUserByName(userName).subscribe( user => {
        let priv = {
          isUser: 0,
          isPass: 0,
          isVerify: 0
        }
        if( user.length == 1 ){
          priv.isUser = 1;        
            if(Md5.init(password) == user[0].userPass || check === true){
              priv.isPass = 1;
              if(user[0].userStatus == "Y"){
                priv.isVerify = 1;  
                let role = user[0]._class;
                
                if(role == "CashierACCOUNT" || role == "CASHIER" || role == "Medical Service" 
                  || role == "Cashier" || role == "CashierCASH" || role == "Registry"){
                    this.login(user[0].userID, "cashier/transact");
                }else if(role == "Laboratory" || role == "LABORATORY"){
                    this.login(user[0].userID, "laboratory");
                }else if(role == "Imaging" || role == "IMAGING"){
                    this.login(user[0].userID, "imaging");
                }
                
              }             
            }        
        }
        observer.next(priv);
      })
    })
     return observ;
    }

    // checkAdmin(userName: any, password: any): Observable<any> {
    //   const observ = new Observable(observer => {
    //     this.getUserByName(userName).subscribe( user => {
    //       let priv = false;
    //       if( user.length == 1 ){       
    //           if(Md5.init(password) == user[0].userPass){
    //              if
    //           }        
    //       }
    //       observer.next(priv);
    //     })
    //   })
    //   return observ;
    // }
    
    login(userID, url):void{
      sessionStorage.setItem('isLoggedIn', "true");
      sessionStorage.setItem('token', userID);
      this.router.navigate([url]);
    }

    logout(): void {
      sessionStorage.setItem('isLoggedIn', "false");
      sessionStorage.removeItem('token');
      this.router.navigate(['authentication']);
    } 

    
}
