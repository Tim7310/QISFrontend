import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TransactionService } from 'src/app/services/transaction.service';
import { transaction, patient } from 'src/app/services/service.interface';
import { PatientService } from 'src/app/services/patient.service';
import { MathService } from 'src/app/services/math.service';
import { ActivatedRoute } from '@angular/router';
export interface accData{
  trans: transaction,
  pat: patient
}
@Component({
  selector: 'sales-pdf',
  templateUrl: './sales-pdf.component.html',
  styleUrls: ['./sales-pdf.component.scss']
})
export class SalesPdfComponent implements OnInit {
  d = new DatePipe('en-US');
  today: any;
  from: any = "2019-05-25 05:00:00";
  to: any = "2019-06-25 20:00:00";
  total: number = 0;
  paidIn: number = 0;
  paidOut: number = 0;
  net: number = 0;
  sales: number = 0;
  return: number = 0;
  ac: number = 0;
  at: number = 0;
  accountData: Array<accData> = [];
  dateDetails  : Promise<any>[];
  dateString        : string[];
  constructor(
    route: ActivatedRoute,
    private TS: TransactionService,
    private PAT: PatientService,
    private math: MathService,
    
  ) { 
    this.today = this.d.transform(new Date(),"yyyy-MM-dd HH:mm:ss");

    this.dateString = route.snapshot.params['dates']
      .split(',');
  }

  ngOnInit() {
    this.dateDetails = this.dateString
      .map(id => this.getInvoiceDetails(id));
      
    Promise.all(this.dateDetails)
      .then(() => this.math.onReportReady());
    
    const url = "getTransactionDate/" + this.dateString[0] + "/" + this.dateString[1];
    this.TS.getTransactions(url)
    .subscribe(data => {
      data.forEach(trans => {
        this.total = this.total + trans.grandTotal;
        this.paidIn = this.paidIn + trans.paidIn;
        this.paidOut = this.paidOut + trans.paidOut;
        if(trans.salesType == "sales"){
          this.sales += 1 ;
        }
        else if(trans.salesType == "return"){
          this.return += 1;
        }

        if(trans.transactionType == "ACCOUNT" 
        || trans.transactionType == "APE" 
        || trans.transactionType == "HMO"){
          this.PAT.getOnePatient("getPatient/" + trans.patientId)
          .subscribe(data =>{
            this.at = this.at + trans.grandTotal;
            this.ac += 1; 
            const _accData = {
              trans: trans,
              pat: data[0]
             
            }
            this.accountData.push(_accData);
          })
        }     
        
      });
      this.net = this.paidIn - this.paidOut;
    })
  }
  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({amount}), 1000)
    );
  }
}
