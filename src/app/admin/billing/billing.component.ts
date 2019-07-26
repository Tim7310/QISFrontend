import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';
import { transData, itemGroup, itemList } from 'src/app/services/service.interface';
import { TransactionService } from 'src/app/services/transaction.service';
import { PatientService } from 'src/app/services/patient.service';
import { ItemService } from 'src/app/services/item.service';
import { heldTable } from 'src/app/page/report-list/report-list.component';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  trans : Array<heldTable> = [];
  

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
    this.trans.push(value);
        console.log(value);
        
  }
}
