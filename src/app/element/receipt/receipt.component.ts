import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  trans: string[];
  transDetails: Promise<any>[];

  constructor(
    route: ActivatedRoute,
    private math: MathService
  ) {
    this.trans = route.snapshot.params['ids']
      .split(',');
   }

  ngOnInit() {
    this.transDetails = this.trans
      .map(id => this.getInvoiceDetails(id));
    Promise.all(this.transDetails)
      .then(() => this.math.onDataReady());
  }
  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({amount}), 1000)
    );
  }
}
