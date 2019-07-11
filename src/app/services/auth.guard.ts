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
        if(url == "/cashier/transact"){
          if( priv[0].cashierCash == 1 || priv[0].cashierCash == 2 || 
              priv[0].cashierAccount == 1 || priv[0].cashierAccount == 2){
            // do nothing
          }else{
            this.router.navigate(['error/privilege']);
          }
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
}
