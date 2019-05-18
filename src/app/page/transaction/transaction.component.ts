import { Component, OnInit, SimpleChanges } from '@angular/core';
import { itemList } from 'src/app/services/service.interface';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  private items: itemList[] = [];
  discount: number = 0;
  discountBtn = [5,10,15,20];

  constructor() { }
  getItem(value){
    let found = this.items.find(item => item.itemId === value.itemId);
    if(found === undefined){
      this.items.push(value);
    }
  }
  deleteItem(value) {
    this.items.splice( this.items.indexOf(value), 1 );
    let itemCount = this.items.length;
    if(itemCount === 0){
      this.discount = 0;
    }
  }
  ngOnInit() {
  }
  
  addDiscount(disc: number){
    this.discount = disc;
  }

}
