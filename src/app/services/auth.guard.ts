import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { priv } from './service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{
  userPriv: priv;
  constructor(private user: UserService, private router : Router){ }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let url: string = state.url; 
      
      if(this.verifyLogin(url)){
      let userID = parseInt(sessionStorage.getItem("token"))
      this.user.getUserPriv(userID)
      .subscribe( priv => {
        
        if(!this.userRules(priv[0], url)){
          this.router.navigate(['error/privilege']);
        }
      })  
      }
      return this.verifyLogin(url);

  }
  verifyLogin(url) : boolean{
      if(!this.isLoggedIn()){
          this.router.navigate(['authentication']);
          return false;
      }
      else if(this.isLoggedIn()){
          return true;
      }
  }
  public isLoggedIn(): boolean{
      let status = false;
      if( sessionStorage.getItem('isLoggedIn') == "true"){
        status = true;
        
      }
      else{
        status = false;
      }
      return status;
  }

  userRules(priv: priv, url): boolean{
    let st = false;
    if(priv.admin == 2){
      st = true;
    }else{
      if(url.match("/cashier/transact")){
        if( priv.cashierCash == 1 || priv.cashierCash == 2 || 
          priv.cashierAccount == 1 || priv.cashierAccount == 2){
          st = true;
        }else{
          st = false;
        }
      }
      if(url.match("/cashier/transactions")){
        if( priv.cashierCash == 1 || priv.cashierCash == 2 || 
          priv.cashierAccount == 1 || priv.cashierAccount == 2){
          st = true;
        }else{
          st = false;
        }
      }
      if(url.match("/cashier/sales")){
        if( priv.cashierCash == 1 || priv.cashierCash == 2 || 
          priv.cashierAccount == 1 || priv.cashierAccount == 2){
          st = true;
        }else{
          st = false;
        }
      }
      if(url.match("/cashier/hmo")){
        if( priv.cashierCash == 2 ){
          st = true;
        }else{
          st = false;
        }
      }
      if(url.match("/cashier/manage-items")){
        if( priv.cashierCash == 2 ){
          st = true;
        }else{
          st = false;
        }
      }
      if(url.match("/cashier/refund-exchange")){
        if( priv.cashierCash == 2 ){
          st = true;
        }else{
          st = false;
        }
      }
      if(url.match("/admin/manage-user")){
        if( priv.admin == 2 ){
          st = true;
        }else{
          st = false;
        }
      }
      if(url.match("/admin/billing")){
        if( priv.admin >= 1 ){
          st = true;
        }else{
          st = false;
        }
      }
      if(url.match("/admin/account-payment")){
        if( priv.admin >= 1 ){
          st = true;
        }else{
          st = false;
        }
      }
      if(url.match("/laboratory/microscopy")){
        if( priv.laboratory >= 1 ){
          st = true;
        }else{
          st = false;
        }
      }
      if(url.match("/laboratory/hematology")){
        if( priv.laboratory >= 1 ){
          st = true;
        }else{
          st = false;
        }
      }
      if(url.match("/laboratory/chemistry")){
        if( priv.laboratory >= 1 ){
          st = true;
        }else{
          st = false;
        }
      }
    }
    

    return st;
  }
}
