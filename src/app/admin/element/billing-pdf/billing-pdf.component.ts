import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MathService } from 'src/app/services/math.service';
import { AccountingService } from 'src/app/services/accounting.service';
import { billing } from 'src/app/services/service.interface';

@Component({
  selector: 'billing-pdf',
  templateUrl: './billing-pdf.component.html',
  styleUrls: ['./billing-pdf.component.scss']
})
export class BillingPdfComponent implements OnInit {
  type = "1";
  id : string[];
  idDetails  : Promise<any>[];
  billing: billing

  constructor(
    route: ActivatedRoute,
    private math  : MathService,
    private AS    : AccountingService
  ) {
    this.id = route.snapshot.params['ids']
      .split(',');
   }

  ngOnInit() {
    this.idDetails = this.id
      .map(id => this.getInvoiceDetails(id));
      
    Promise.all(this.idDetails)
      .then(() => this.math.onBillingReady());

    this.AS.getBil(parseInt(this.id[0])).subscribe(
      data => {
        this.billing = data[0];
        console.log(data);
        
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
