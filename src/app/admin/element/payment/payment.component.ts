import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AccountingService } from 'src/app/services/accounting.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { billing } from 'src/app/services/service.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  billing: billing;

  payment = new FormGroup({
    companyID: new FormControl(null,[
      Validators.required,
    ]),
    transactionID: new FormControl(null),
    billID: new FormControl(null),
    paymentType: new FormControl(null,[
      Validators.required,
    ]),
    debit: new FormControl(null,[
      Validators.required,
    ]),
    paymentCur: new FormControl(null,[
      Validators.required,
    ]),
    bank: new FormControl(null),
    checkDate: new FormControl(null),
    checkNo: new FormControl(null),
    paymentDate: new FormControl(null,[
      Validators.required,
    ]),
  })

  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    private dialog: MatDialog,
    private AS: AccountingService,
    private TS: TransactionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
  }

  ngOnInit() {
    if(this.data.type == 0){
      this.payment.controls.billID.setValue(this.data.id);
      this.AS.getBil(this.data.id).subscribe(
        bil => {
          this.billing = bil[0];
        }
      )
    }
  }

}
