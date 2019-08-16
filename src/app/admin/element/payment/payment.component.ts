import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AccountingService } from 'src/app/services/accounting.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { billing, transaction } from 'src/app/services/service.interface';
import { ConfirmComponent } from 'src/app/element/confirm/confirm.component';
import { MathService } from 'src/app/services/math.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 10;
  }
  billing: billing;
  transaction: transaction;

  payment = new FormGroup({
    companyID: new FormControl(null,[
      Validators.required,
    ]),
    transactionID: new FormControl(null),
    billID: new FormControl(null),
    paymentType: new FormControl('CASH',[
      Validators.required,
    ]),
    debit: new FormControl(null,[
      Validators.required,
    ]),
    paymentCur: new FormControl("PESO",[
      Validators.required,
    ]),
    bank: new FormControl(null),
    checkDate: new FormControl(null),
    checkNo: new FormControl(null),
    paymentDate: new FormControl(null),
  })

  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    private math: MathService,
    private dialog: MatDialog,
    private AS: AccountingService,
    private TS: TransactionService,
    private IS: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
  }

  ngOnInit() {
    if(this.data.type == 0){
      this.payment.controls.billID.setValue(this.data.id);
      this.AS.getBil(this.data.id).subscribe(
        bil => {
          this.billing = bil[0];
          this.payment.controls.companyID.setValue(bil[0].companyID);
        }
      )
    }else if(this.data.type == 1){
      this.TS.getOneTrans("getTransaction/" + this.data.id).subscribe(
        data => {
          this.transaction = data[0];
          this.IS.getCompany("getCompanyName/" + data[0].biller).subscribe(
            com => {
              this.payment.controls.companyID.setValue(com[0].companyID);
            }
          )
        }
      )
    }
  }

  pay(){
    this.payment.controls.paymentDate.setValue(this.math.getDateNow());
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: {Title: "Are you sure?", Content: "New Account payment will be save to database."}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == "ok"){
        // save new payment  
        this.AS.addAccPayment(this.payment.value).subscribe(
          data => {
            if(data == 1){
              this.dialogRef.close({
                message : "Payment successful.",
                status  : "ok", 
              });
            }else{
              this.dialogRef.close({
                message : "Payment unsuccessful.",
                status  : "ok", 
              });
            }
          }
        )
       
      }
    }); 
  }
}
