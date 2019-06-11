import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MathService } from 'src/app/services/math.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { transaction, patient } from 'src/app/services/service.interface';
import { PatientService } from 'src/app/services/patient.service';
import * as moment from 'moment';

@Component({
  selector: 'receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  trans         : string[];
  transDetails  : Promise<any>[];
  transData     : transaction;
  patient       : patient;

  constructor(
    route: ActivatedRoute,
    private math: MathService,
    private TS: TransactionService,
    private PS: PatientService
  ) {
    this.trans = route.snapshot.params['ids']
      .split(',');
   }

  ngOnInit() {
    this.transDetails = this.trans
      .map(id => this.getInvoiceDetails(id));
    Promise.all(this.transDetails)
      .then(() => this.math.onDataReady());

      this.TS.getOneTrans("getTransaction/" + this.trans)
      .subscribe(
        data => {
          this.transData = data[0];
          
          this.PS.getOnePatient("getPatient/" + data[0].patientId)
          .subscribe( pat => {
            this.patient = pat[0];
            this.patient.age = moment().diff(this.patient.birthdate, 'years');
          })
        }   
      )
  }
  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({amount}), 1000)
    );
  }
}
