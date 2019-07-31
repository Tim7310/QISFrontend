import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';
import { transData, itemGroup, itemList, company, accPayment, billing, personnel } from 'src/app/services/service.interface';
import { TransactionService } from 'src/app/services/transaction.service';
import { PatientService } from 'src/app/services/patient.service';
import { ItemService } from 'src/app/services/item.service';
import { heldTable } from 'src/app/page/report-list/report-list.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountingService } from 'src/app/services/accounting.service';
import { ConfirmComponent } from 'src/app/element/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { SoaListComponent } from '../soa-list/soa-list.component';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  trans : Array<heldTable> = [];
  personnel : personnel[];
  soa = new FormGroup({
    companyID: new FormControl("",[
      Validators.required,
    ]),
    soaCode: new FormControl("",[
      Validators.required, 
    ]),
    address: new FormControl("",[
      Validators.required,
    ]),
    attention: new FormControl("",[
      Validators.required,
    ]),
    prepared: new FormControl("",[
      Validators.required,
    ]),
    verified: new FormControl("",[
      Validators.required,
    ]),
    validated: new FormControl(""),
  })


  constructor(
    public math : MathService,
    private AS  : AccountingService,
    public dialog : MatDialog
  ) {
    this.math.navSubs("admin");
   }

  ngOnInit() {

    this.AS.getPersonnelDep("ACC").subscribe(
      data => {
        this.personnel = data;
      }
    )    
  }

  getTrans(value){
    let found = this.trans.find(t => t.id === value.id);
    if(!found){
      this.trans.push(value);   
    }    
  }

  delete(value){
      this.trans.splice( this.trans.indexOf(value), 1 );  
  }

  compTotal(items: itemList[]){
    let total: number = 0;
    items.forEach(item => {
      total += item.itemPrice;
    });

    return total;
  }

  cancel(){
    this.trans = [];
    this.soa.reset();
  }

  getCompany(value){
    this.soa.controls.companyID.setValue(value.companyID);
  }

  openList(){
    this.dialog.open(SoaListComponent, {
      width: '80%'
    })
  }

  save(){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: {Title: "Are you sure?", Content: "You want to save this billing?"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == "ok"){
        let ids: string = "";
        let from: any;
        let to: any;
        this.trans.forEach((tran, i) => {
          if(i == 0){
            to = tran.date;
            from = tran.date;
          }
         
          if(this.trans.length == i + 1){
            ids = ids + tran.id;
          }else{
            ids = ids + tran.id + ",";
          }
          
           if(new Date(from) > new Date(tran.date)){
             from = tran.date;
           }
           if(new Date(to) < new Date(tran.date)){
             to = tran.date;
           }
    
        });
        
        let bill: billing = {
          soaCode     : this.soa.controls.soaCode.value,
          fromDate    : from,
          toDate      : to,
          soaDate     : this.math.dateNow(),
          transIds    : ids,
          address     : this.soa.controls.address.value,
          companyID   : this.soa.controls.companyID.value,
          attention   : this.soa.controls.attention.value,
          prepared    : this.soa.controls.prepared.value,
          verified    : this.soa.controls.verified.value,
          validated   : this.soa.controls.validated.value
        }
        this.AS.addBilling(bill).subscribe( res => {
          if( res == 1 ){
            this.math.openSnackBar("Billing successfuly added", "ok");
            this.cancel();
          }else{
            this.math.openSnackBar("Error acquired, billing not added", "cancel");
          }
        })
      }
    })
  }
}
