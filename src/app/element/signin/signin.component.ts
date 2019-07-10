import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  user = new FormGroup({
    user: new FormControl("", [Validators.required]),
    pass: new FormControl("", [Validators.required]),
  });
  errorMessage = undefined;
  constructor(
    private US: UserService
  ) { }

  ngOnInit() {
  }

  signin(){
    const user = this.user.get("user").value;
    const pass = this.user.get("pass").value; 
       
   this.US.checkUser(user, pass).subscribe(priv => {
     if(priv.isUser == 0){
      this.errorMessage = "User Not Exist!!!";
     }else if(priv.isUser == 1 && priv.isPass == 0 ){
      this.errorMessage = "Wrong Password!!!";
     }else if( priv.isVerify == 0 ){
      this.errorMessage = "Account not Verified!!!";
     }
    else if(priv.isUser == 1 && priv.isPass == 1){
      this.errorMessage = undefined;
     }
   })
    
  }
}
