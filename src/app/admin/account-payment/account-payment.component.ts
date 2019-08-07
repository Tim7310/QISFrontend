import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';
import { AccountingService } from 'src/app/services/accounting.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-account-payment',
  templateUrl: './account-payment.component.html',
  styleUrls: ['./account-payment.component.scss']
})
export class AccountPaymentComponent implements OnInit {

  constructor(
    public math : MathService,
    private AS  : AccountingService,
    public dialog : MatDialog
  ) {
    this.math.navSubs("admin");
   }

  ngOnInit() {
  }
}
