import { Component, OnInit, ViewChild } from '@angular/core';
import { MathService } from 'src/app/services/math.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Md5 } from 'md5-typescript';
import { TransactionService } from 'src/app/services/transaction.service';
import { transaction, patient, user, itemList, trans_items, total } from 'src/app/services/service.interface';
import { PatientService } from 'src/app/services/patient.service';
import { ItemService } from 'src/app/services/item.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmComponent } from 'src/app/element/confirm/confirm.component';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
  @ViewChild('stepper') stepper;

  isLinear = true;
  isEditable = false;

  verify: FormGroup;
  transNO: FormGroup;
  trans: transaction;
  patient: patient;
  cashier: user;
  items: trans_items[] = [];
  refundTotal: number;
  transactionRef: number;

  constructor(
    private _formBuilder: FormBuilder,
    private math  : MathService,
    private user  : UserService,
    private TS    : TransactionService,
    private pat   : PatientService,
    private IS    : ItemService,
    public dialog : MatDialog, 
    public _snackBar: MatSnackBar
  ) {
    this.math.navSubs("cashier");
  }

  ngOnInit() {
    this.verify = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      verified: ['', Validators.required]
    });
    this.transNO = this._formBuilder.group({
      id: ['', Validators.required],
      verified: ['', Validators.required]
    });

    this.verify.get("password").valueChanges.subscribe(val => {
      this.verifyAdmnin();
    })
    this.verify.get("username").valueChanges.subscribe(val => {
      this.verifyAdmnin();
    })
    this.transNO.get("id").valueChanges.subscribe(val => {
      this.checkTransaction(val);
    })

    this.TS.getTransactions("getTransaction")
    .subscribe(data => 
      this.transactionRef = this.math.transcheckRef(data)
    ); 
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  verifyAdmnin(){
    if(this.verify.get("username").value){
      this.user.getUserByName(this.verify.get("username").value)
      .subscribe(user => {
        if(user.length > 0){
          let password = this.verify.get("password").value;
          if(Md5.init(password) == user[0].userPass){
            this.user.getUserPriv(user[0].userID).subscribe(
              priv => {
                if(priv[0].admin == 2){
                  this.setVerify(true);
                }else{
                  this.setVerify(false);
                }
              }
            )            
          }else{
            this.setVerify(false);
          }         
        }else if(this.verify.get("verified").value){
          this.setVerify(false);
        }
      })
    }else{
      this.setVerify(false);
    }
  }

  checkTransaction(id:number){
    if(this.transNO.get("id").value){
    this.TS.getOneTrans("getTransaction/" + id).subscribe(
      trans => {
        if(trans[0]){
          this.transNO.get("verified").setValue("check");
          this.trans = trans[0];

          this.pat.getOnePatient("getPatient/" + trans[0].patientId).subscribe(
            pat => {
              this.patient = pat[0]; 
            }
          )
    
          this.user.getUser(trans[0].userId).subscribe(
            user => {
              this.cashier = user[0];
            }
          )

          this.TS.getTransExt(id).subscribe( 
            ext => {
              this.items = [];
              let trans_items: trans_items;
              ext.forEach(element => {
                if(element.itemID == null){
                 this.IS.getPack("getPackageName/" + element.packageName).subscribe(
                   pack => {
                     let pack_item:itemList = {
                      itemId          : pack[0].packageName,
                      itemName        : pack[0].packageName,
                      itemPrice       : pack[0].packagePrice,
                      itemDescription : pack[0].packageDescription,
                      itemType        : pack[0].packageType,
                      deletedItem     : pack[0].deletedPackage,
                      neededTest      : 0,
                      creationDate    : pack[0].creationDate,
                      dateUpdate      : pack[0].dateUpdate
                     }
                     trans_items = {ext: element, item: pack_item}
                     this.items.push(trans_items);
                     this.totalPrice();
                   }
                 )
                }else{
                  this.IS.getItemByID(element.itemID).subscribe(
                    item => {
                      trans_items = {ext: element, item: item[0]}
                      this.items.push(trans_items);
                      this.totalPrice();
                      
                    }
                  )
                }
                
              });
              
            })
        }else{
          this.transNO.get("verified").setValue("");
        }
      }
    )
    }
  }

  setVerify(foo: boolean){
    if(foo){
      this.verify.get("verified").setValue("admin");
    }else{
      this.verify.get("verified").setValue("");
    }
  }

  delete(item: trans_items){
    this.items.splice( this.items.indexOf(item), 1 );
    this.totalPrice();
  }
  
  totalPrice(){
    let price = 0;
    this.items.forEach(item => {
      price = price + parseInt(this.math.computeDisc(
        item.item.itemPrice, item.ext.itemDisc, item.ext.itemQTY
      ));
    });
    this.refundTotal = price;
  }

  refundTrans(){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: {Title: "Are you sure?", Content: "Items will be refunded!!!"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "ok"){ 
        let total: total[] = [];
        let itemList: itemList[] = [];
        this.trans.salesType = "refund";
        this.trans.transactionId = undefined;
        this.trans.transactionRef = this.transactionRef;
        this.trans.paidIn = 0;
        this.trans.paidOut = 0;
        this.trans.grandTotal = 0 - this.trans.grandTotal;
        this.trans.totalPrice = 0 - this.trans.totalPrice;
        this.trans.userId = parseInt(sessionStorage.getItem("token"));
        this.trans.notes = "Verify by: " + this.cashier.userName;
        this.trans.transactionDate = this.math.dateNow();

        this.items.forEach((item, index) => {
          let _total: total = {
            id          : item.item.itemId,
            price       : item.item.itemPrice,
            subtotal    : 0,
            quantity    : item.ext.itemQTY,
            discount    : item.ext.itemDisc
          }
          total.push(_total);
          itemList.push(item.item);
          if(this.items.length - 1 == index){
            this.TS.saveTransaction(this.trans, total, itemList).subscribe(
              trans => {
                if(trans){
                  this.openSnackBar("Transaction successfully refunded", "close");
                  this.stepper.reset();
                }else{
                  this.openSnackBar("Error Refunding the transaction", "close");
                  
                }
              }
            )
          }
        });
        
      }
    })
  }
}
