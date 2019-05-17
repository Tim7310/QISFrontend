import { Component, OnInit } from '@angular/core';
import { itemList } from 'src/app/services/service.interface';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  private items: itemList[] = [];

  constructor() { }
  getItem(value){
    let found = this.items.find(item => item.itemId === value.itemId);
    if(found === undefined){
      this.items.push(value);
    }
  }
  deleteItem(value) {
    this.items.splice( this.items.indexOf(value), 1 );
    console.log(value);
    console.log(this.items);
  }
  ngOnInit() {
  }

}
