import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MathService } from 'src/app/services/math.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-account',
  templateUrl: './pending-account.component.html',
  styleUrls: ['./pending-account.component.scss']
})
export class PendingAccountComponent implements OnInit {

  constructor( 
    private user : UserService,
    private math : MathService,
    public  route : Router
  ) {
    this.math.navVisibility(false);
   }

  ngOnInit() {
    let userID = parseInt(sessionStorage.getItem('token'));
      if(userID){
        this.user.getUser(userID).subscribe(
          user => {
            if(user[0]){         
              this.user.checkUser(user[0].userName, '', true).subscribe(
                data => {
                  
                }
              )
            } 
          }
        )
      }
  }

  redirect(){
    this.route.navigate(['authentication/signin']);
  }
}
