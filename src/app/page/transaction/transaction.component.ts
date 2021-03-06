import { Component, OnInit, SimpleChanges, Inject } from '@angular/core';
import { itemList, total, transaction, patient, transExt } from 'src/app/services/service.interface';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientFormComponent } from 'src/app/element/patient-form/patient-form.component';
import { MatSnackBar } from '@angular/material';
import { CompanyFormComponent } from 'src/app/element/company-form/company-form.component';
import { PatientService } from 'src/app/services/patient.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Global } from 'src/app/global.variable';
import { ConfirmComponent } from 'src/app/element/confirm/confirm.component';
import { HeldTransactionComponent } from 'src/app/element/held-transaction/held-transaction.component';
import { ItemService } from 'src/app/services/item.service';
import { MathService } from 'src/app/services/math.service';

import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit{
  items : itemList[] = [];
  discount : number = 0;
  discountBtn = [ 0, 5, 10, 15, 20 ];
  moneyBtn = [ 20, 50, 100, 200, 500, 1000 ];
  total : total[] = [];
  totalVal : any = 0;
  subTotal : any = 0;
  discounted : any = 0;
  transType : string = undefined;
  transTypeBTN = [
    {name: "CASH", status: true}, 
    {name: "ACCOUNT", status: true}, 
    {name: "HMO", status: true}, 
    {name: "APE", status: true} 
  ];
  receivedAmount = new FormControl(0);
  change : any = 0;
  arError : string = undefined;
  currency : string = "PESO";
  transaction : transaction;
  patient : patient;
  transactionRef : number;
  biller: any = "";
  LOENumber: FormControl = new FormControl("");
  AccountNumber: FormControl = new FormControl("");
  transID = undefined;
  userID: number = parseInt(sessionStorage.getItem("token"));
  

  constructor(
    public dialog     : MatDialog, 
    private _snackBar : MatSnackBar,
    private pat       : PatientService,
    private trans     : TransactionService,
    public math       : MathService,
    public global     : Global,
    private IS        : ItemService,
    private user      : UserService
    ) { 
    this.totalVal = 0;
    this.math.navSubs("cashier");
    }
  ngOnInit() {
    //user privilege
    this.user.getUserPriv(this.userID).subscribe(
      priv => {
        if(priv[0].cashierCash == 0){
          this.transTypeBTN[0].status = false;
        }
      }
    )

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
    this.currency = "PESO";
  }
  addMoney(money: number){
    let den = parseInt(this.receivedAmount.value) + money;
    this.receivedAmount.setValue(den);
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
    if(this.currency === "PESO"){
      this.currency = "USD";
    }else{
      this.currency = "PESO";
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

  

  getBiller(value){
    this.biller = value.nameCompany;
  }

  onPrintInvoice() {
    const ids = ['1453'];
    this.math.printDocument('', ids);
  }

  save(saveType: string){
    this.transaction = {
      transactionId   : this.transID,
      transactionRef  : this.transactionRef,
      patientId       : this.patient.patientID,
      userId          : this.userID,
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
      currency        : this.currency,
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
      data: {Title: "Are you sure?", Content: "New Transaction will be save to database."}
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
              this.cancel();
            })  
          }else if(saveType == "PRINT"){
            
            this.trans.saveTransaction(
              this.transaction,
              this.total,
              this.items
            ).subscribe(success => {
              let url: any;
              if(this.transaction.transactionId != undefined){
                url = "getTransaction/" + this.transaction.transactionId;
              }else{
                url = "getTransRef/" + this.transaction.transactionRef;
              }                                   
              this.trans.getOneTrans(url)
              .subscribe(data => {
                // console.log(data);
                const suffix = [data[0].transactionId];
                this.math.printDocument('', suffix);
                this.cancel();
               
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
              this.cancel();
            })  
          }       
         
        }catch(e){
          this.openSnackBar(e.message, "close");
        }  
      }
    });  
  }

  holdTrans(){
    const dialogRef = this.dialog.open(HeldTransactionComponent, {
      width: '80%',
    });
    dialogRef.afterClosed().subscribe(heldTrans => {
      if(heldTrans){
        this.items = [];
        this.total = [];
        this.transID = heldTrans;
        console.log(this.transID);
        
        this.trans.getOneTrans("getTransaction/" + heldTrans)
        .subscribe(
          transData => {
            this.pat.getOnePatient("getPatient/" + transData[0].patientId)
            .subscribe(
              pats => {
                this.patient = pats[0];
              }
            )
            this.transType = transData[0].transactionType;
            
            this.trans.getTransExt(heldTrans).subscribe(
              transExt => {
                for (let index = 0; index < transExt.length; index++) {                  
                  if(transExt[index].packageName != null){
                      this.IS.getPack("getPackageName/" + transExt[index].packageName)
                      .subscribe(
                        pack => {
                          let packItem : itemList = {
                            itemId          : pack[0].packageName,
                            itemName        : pack[0].packageName,
                            itemPrice       : pack[0].packagePrice,
                            itemDescription : pack[0].packageDescription,
                            itemType        : pack[0].packageType,
                            deletedItem     : pack[0].deletedPackage,
                            neededTest      : undefined,
                            creationDate    : pack[0].creationDate,
                            dateUpdate      : pack[0].dateUpdate,
                          }
                          this.items.push(packItem);            
                        }
                    )
                  }else if(transExt[index].itemID != null){
                      this.IS.getItemByID(transExt[index].itemID)
                      .subscribe( item => {
                        this.items.push(item[0]);                                      
                      });
                  }
                     
                }
               
               
              }
            )
          }   
        )
      }      
    })
  }

  cancel(){
    this.items = [];
    this.discount = 0;
    this.total = [];
    this.totalVal  = 0;
    this.subTotal  = 0;
    this.discounted  = 0;
    this.transType = undefined;
    this.receivedAmount.setValue(0);
    this.change = 0;
    this.arError = undefined;
    this.currency  = "PESO";
    this.biller = "";
    this.LOENumber.setValue("");
    this.AccountNumber.setValue("");
    this.transID = undefined;
    this.patient = undefined;
    
    this.trans.getTransactions("getTransaction")
    .subscribe(data => 
      this.transactionRef = this.math.transcheckRef(data)
    );  
   
  }

}
