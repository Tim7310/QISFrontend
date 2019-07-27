import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';
import { transData, itemGroup, itemList, company } from 'src/app/services/service.interface';
import { TransactionService } from 'src/app/services/transaction.service';
import { PatientService } from 'src/app/services/patient.service';
import { ItemService } from 'src/app/services/item.service';
import { heldTable } from 'src/app/page/report-list/report-list.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  trans : Array<heldTable> = [];
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
  })


  constructor(
    public math : MathService,
    private TS : TransactionService,
    private PS : PatientService,
    private IS : ItemService
  ) {
    this.math.navSubs("admin");
   }

  ngOnInit() {
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
}
