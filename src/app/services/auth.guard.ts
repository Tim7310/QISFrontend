import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{

  constructor(private user: UserService, private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let url: string = state.url;  
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
