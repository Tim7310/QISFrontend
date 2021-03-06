import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthGuard } from 'src/app/services/auth.guard';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthenticationComponent implements OnInit {


  constructor(
    private user: UserService,
    private auth: AuthGuard,
    private math: MathService
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

}
