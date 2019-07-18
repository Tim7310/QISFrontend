import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { Md5 } from 'md5-typescript';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  roles = [
    { value: "CASHIER" },
    { value: "LABORATORY" },
    { value: "NURSE" },
    { value: "IMAGING" },
    { value: "ADMIN" },
    { value: "ACCOUNTING" },
  ]
  signup: FormGroup;
  matcher = new MyErrorStateMatcher();
  userError = undefined;

  constructor(
    private _formBuilder: FormBuilder,
    private user        : UserService,
    private router      : Router
  ) { }

  ngOnInit() {
    let r = Math.random().toString(36).substring(2, 5);

    this.signup = this._formBuilder.group({
      userName:   ['', Validators.required],
      userEmail:  ['', Validators.required],
      userPass:   ['', [Validators.required, Validators.minLength(5)]],
      conPass:    [''],
      userStatus: ['N', Validators.required],
      tokenCode:  [Md5.init(r)],
      _class:     ['', Validators.required]
    }, { validator: this.checkPasswords });

    this.signup.controls.userName.valueChanges.subscribe( 
      data => {
        if(data){
          this.user.getUserByName(data).subscribe(user => {
            if(user[0]){
              this.userError = "User Name already exist";
            }else{
              this.userError = undefined;
            }
          })
        }       
      }
    )
  }

  checkPasswords(group: FormGroup) { 
    let pass = group.controls.userPass.value;
    let confirmPass = group.controls.conPass.value;

    return pass === confirmPass ? null : { notSame: true }     
  }

  upload(){
    let pass = Md5.init(this.signup.controls.userPass.value);
    this.signup.controls.userPass.setValue(pass);
    this.user.addUser(this.signup.value).subscribe(
      sign => {
        if(sign == 1){
          this.router.navigate(['authentication/pending']);
        }
      }
    )
  }
  
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty && control.touched 
      && control.parent.errors['notSame']);
    const invalidParent = !!(control && control.parent && control.parent.invalid 
      && control.parent.dirty );

     return control.parent.errors && control.parent.errors['notSame'];
  }
}
