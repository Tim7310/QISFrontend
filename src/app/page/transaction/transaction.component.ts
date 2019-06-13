import { Component, OnInit, SimpleChanges, Inject } from '@angular/core';
import { itemList, total, transaction, patient, transExt } from 'src/app/services/service.interface';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientFormComponent } from 'src/app/element/patient-form/patient-form.component';
import { MatSnackBar } from '@angular/material';
import { CompanyFormComponent } from 'src/app/element/company-form/company-form.component';
import { PatientService } from 'src/app/services/patient.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { MathService } from 'src/app/services/math.service';
import { Global } from 'src/app/global.variable';
import { ConfirmComponent } from 'src/app/element/confirm/confirm.component';


@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit{
  items : itemList[] = [];
  discount : number = 0;
  discountBtn = [ 5, 10, 15, 20 ];
  moneyBtn = [ 50, 100, 200, 500, 1000 ];
  total : total[] = [];
  totalVal : any = 0;
  subTotal : any = 0;
  discounted : any = 0;
  transType : string = undefined;
  transTypeBTN = ["CASH", "ACCOUNT", "HMO", "APE" ];
  receivedAmount = new FormControl(0);
  change : any = 0;
  arError : string = undefined;
  currency : string = "PHP";
  transaction : transaction;
  patient : patient;
  transactionRef : number;
  biller: any = "";
  LOENumber: FormControl = new FormControl;
  AccountNumber: FormControl = new FormControl;

  constructor(
    public dialog     : MatDialog, 
    private _snackBar : MatSnackBar,
    private pat       : PatientService,
    private trans     : TransactionService,
    public math       : MathService,
    public global     : Global,
    ) { 
    this.totalVal = 0;
    }
  ngOnInit() {
    // change computation 
    this.receivedAmount.valueChanges
    .subscribe(data => this.updateChange(data)); 

    // Generate transaction random numbers
    this.trans.getTransactions("getTransaction")
    .subscribe(data => 
      this.transactionRef = this.math.transcheckRef(data)
    );  
  }
  //get item from dropdown list
  getItem(value){
    let found = this.items.find(item => item.itemId === value.itemId);
    if(found === undefined){
      this.items.push(value);
    }    
  }
  deleteItem(value) {
    this.items.splice( this.items.indexOf(value), 1 );
    let filt = this.total.filter(data => data.id === value.itemId);
    this.total.splice( this.total.indexOf(filt[0]), 1 );  
    let itemCount = this.items.length;
    if(itemCount === 0){
      this.discount = 0;
    }
    this.computeTotal();
  } 
  addDiscount(disc: number){
    this.discount = disc;
  }
  itemTotal(value){
    let found = this.total.find(total => total === value);
    if(found != undefined){
      this.total.splice( this.total.indexOf(value), 1 );      
    }   
    this.total.push(value);
    this.computeTotal();
  }
  computeTotal(){
    let num: number = 0;
    let num2: number = 0;
    this.total.forEach(function (value) {
      num += value.price;
      num2 += value.subtotal;
    });
    let num3 = num2 - num;
    this.totalVal = num.toFixed(2);
    this.subTotal = num2.toFixed(2);
    this.discounted = num3.toFixed(2);
    this.receivedAmount.setValue(this.totalVal); 
    
  }
  changeTrans(type){
    this.transType = type;
    this.currency = "PHP";
  }
  addMoney(money){
    this.receivedAmount.setValue(money);
  }
  updateChange(data){
    if(data < this.totalVal){
      this.change = 0;
      this.arError = "Please Input higher amount";
    }else{
      this.change = data - this.totalVal;
      this.change = this.change.toFixed(2);
      this.arError = undefined;
    }
  }
  changeCurrency(){
    if(this.currency === "PHP"){
      this.currency = "USD";
    }else{
      this.currency = "PHP";
    }
  }
  getPatient(value){
    this.patient = value;
  }
  resetPatient(){
    this.patient = undefined;
  }
  newPatient(): void{
    const dialogRef = this.dialog.open(PatientFormComponent, {
      width: '90%',
      data: undefined
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.status == "ok"){
        this.openSnackBar(result.message, "close");
        this.pat.getOnePatient("checkRef/" + result.data.patientRef)
        .subscribe(data => this.patient = data[0]);
      }  
    });    
  }
  editPatient(): void{
    const dialogRef = this.dialog.open(PatientFormComponent, {
      width: '90%',
      data: this.patient
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.status == "ok"){
        this.openSnackBar(result.message, "close");
        this.pat.getOnePatient("checkRef/" + result.data.patientRef)
        .subscribe(data => this.patient = data[0]);
      }  
    });    
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  addCompany(){
    const dialogRef = this.dialog.open(CompanyFormComponent, {
      
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.status == "ok"){
        this.openSnackBar(result.message, "close");
      }  
    });   
  }

  cancel(){
    location.reload();
  }

  getBiller(value){
    this.biller = value.nameCompany;
  }

  onPrintInvoice() {
    const ids = ['1453'];
    this.math.printDocument('', ids);
  }

  save(saveType: string){
    this.transaction = {
      transactionId   : undefined,
      transactionRef  : this.transactionRef,
      patientId       : this.patient.patientID,
      userId          : this.global.userID,
      transactionType : this.transType,
      biller          : this.patient.companyName,
      totalPrice      : this.subTotal,
      paidIn          : 0,
      paidOut         : 0,
      grandTotal      : this.totalVal,
      status          : 1,
      salesType       : "sales",
      loe             : "",
      an              : "",
      ac              : "",
      notes           : "",
      transactionDate : this.math.getDateNow()
    }
    if        (this.transType === "CASH"){
      this.transaction.paidIn   = this.receivedAmount.value;
      this.transaction.paidOut  = this.change;
    }else if  (this.transType === "ACCOUNT"){
      this.transaction.biller = this.biller;
    }else if  (this.transType === "HMO"){
      this.transaction.biller = this.biller;
      this.transaction.loe    = this.LOENumber.value;
      this.transaction.an     = this.AccountNumber.value;

    }else if  (this.transType === "APE"){
      this.transaction.biller = this.biller;
    }else{
      this.openSnackBar("Please select transaction type", "close");
      return;
    }
    // save transaction data to database function
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: {Title: "Are you sure?", Content: "New Patient will be save to database."}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == "ok"){ 
        try{
          if(saveType == "SAVE"){
            this.trans.saveTransaction(
              this.transaction,
              this.total,
              this.items
            ).subscribe(success => {
              this.openSnackBar("Transaction Success", "close");
              location.reload();
            })  
          }else if(saveType == "PRINT"){
            
            this.trans.saveTransaction(
              this.transaction,
              this.total,
              this.items
            ).subscribe(success => {
              const url = "getTransRef/" + this.transaction.transactionRef;                      
              this.trans.getOneTrans(url)
              .subscribe(data => {
                const suffix = [data[0].transactionId];
                this.math.printDocument('', suffix);

                window.addEventListener("afterprint", function(event) { 
                  location.reload();
                });
              })           
            })
          
          }else if(saveType == "HOLD"){
            this.transaction.status = 0;
            this.trans.saveTransaction(
              this.transaction,
              this.total,
              this.items
            ).subscribe(success => {
              this.openSnackBar("Transaction HELD", "close");
              location.reload();
            })  
          }       
         
        }catch(e){
          this.openSnackBar(e.message, "close");
        }  
      }
    });  
  }
  holdTrans(){

  }
}
