import { Component, OnInit } from '@angular/core';
import { itemList } from 'src/app/services/service.interface';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  private item: itemList[];

  constructor() { }
  getItem(value){
    this.item = value;
  }
  ngOnInit() {
  }

}
