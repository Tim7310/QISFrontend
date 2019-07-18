import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pending-account',
  templateUrl: './pending-account.component.html',
  styleUrls: ['./pending-account.component.scss']
})
export class PendingAccountComponent implements OnInit {

  constructor( 
    private user : UserService
  ) { }

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

}
