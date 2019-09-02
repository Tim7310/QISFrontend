import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'lab-result',
  templateUrl: './lab-result.component.html',
  styleUrls: ['./lab-result.component.scss']
})
export class LabResultComponent implements OnInit {
  id : string[];
  idDetails  : Promise<any>[];

  constructor(
    route: ActivatedRoute,
    private math: MathService
  ) { 
    this.id = route.snapshot.params['ids']
      .split(',');
  }

  ngOnInit() {
    this.idDetails = this.id
      .map(id => this.getInvoiceDetails(id));
      
    Promise.all(this.idDetails)
      .then(() => this.math.onLabReady());
  }

  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({amount}), 1000)
    );
  }

}
