import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    private math  : MathService
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
  }
}
