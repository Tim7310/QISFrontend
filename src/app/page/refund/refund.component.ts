import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {

  isLinear = true;
  verify: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private math  : MathService,
    private user  : UserService
  ) {
    this.math.navSubs("cashier");
  }

  ngOnInit() {
    this.verify = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      verified: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.verify.valueChanges.subscribe(val => {
      this.verifyAdmnin();
    })
  }

  verifyAdmnin(){
    if(this.verify.get("username").value){
      this.user.getUserByName(this.verify.get("username").value)
      .subscribe(user => {
        if(user.length > 0){
          this.verify.get("verified").setValue("asd");
        }
      })
    }else{
      this.verify.get("verified").setValue("");
    }
  }
}
