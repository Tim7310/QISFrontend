import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Md5 } from 'md5-typescript';
import { TransactionService } from 'src/app/services/transaction.service';
import { transaction, patient, user, itemList, trans_items } from 'src/app/services/service.interface';
import { PatientService } from 'src/app/services/patient.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {

  isLinear = true;
  isEditable = false;

  verify: FormGroup;
  transNO: FormGroup;
  trans: transaction;
  patient: patient;
  cashier: user;
  items: trans_items[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private math  : MathService,
    private user  : UserService,
    private TS    : TransactionService,
    private pat   : PatientService,
    private IS    : ItemService
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
                this.IS.getItemByID(element.itemID).subscribe(
                  item => {
                    trans_items = {ext: element, item: item[0]}
                    this.items.push(trans_items);
                    console.log(trans_items);
                    
                  }
                )
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

}
