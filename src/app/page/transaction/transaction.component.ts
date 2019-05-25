import { Component, OnInit, SimpleChanges } from '@angular/core';
import { itemList, total, transaction, patient } from 'src/app/services/service.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit{
  private items: itemList[] = [];
  discount: number = 0;
  discountBtn = [ 5, 10, 15, 20 ];
  moneyBtn = [ 50, 100, 200, 500, 1000 ];
  total: total[] = [];
  totalVal:any = 0;
  subTotal:any = 0;
  discounted:any = 0;
  transType:string = undefined;
  transTypeBTN = ["CASH", "ACCOUNT", "HMO", "APE" ];
  receivedAmount = new FormControl();
  change:any = 0;
  arError: string = undefined;
  currency: string = "PHP";
  transaction: transaction;
  patient: patient;

  constructor() { 
    this.totalVal = 0;
  }
  ngOnInit() {
    // change computation 
    this.receivedAmount.valueChanges
    .subscribe(data => this.updateChange(data));    
  }
  getItem(value){
    let found = this.items.find(item => item.itemId === value.itemId);
    if(found === undefined){
      this.items.push(value);
    }
  }
  deleteItem(value) {
    this.items.splice( this.items.indexOf(value), 1 );
    let filt = this.total.filter(data => data.id === value.itemId);
    this.total.splice( this.total.indexOf(filt[0]), 1 );  
    let itemCount = this.items.length;
    if(itemCount === 0){
      this.discount = 0;
    }
    this.computeTotal();
  } 
  addDiscount(disc: number){
    this.discount = disc;
  }
  itemTotal(value){
    let found = this.total.find(total => total === value);
    if(found != undefined){
      this.total.splice( this.total.indexOf(value), 1 );      
    }   
    this.total.push(value);
    this.computeTotal();
  }
  computeTotal(){
    let num: number = 0;
    let num2: number = 0;
    this.total.forEach(function (value) {
      num += value.price;
      num2 += value.subtotal;
    });
    let num3 = num2 - num;
    this.totalVal = num.toFixed(2);
    this.subTotal = num2.toFixed(2);
    this.discounted = num3.toFixed(2);
    this.receivedAmount.setValue(this.totalVal); 
  }
  changeTrans(type){
    this.transType = type;
    this.currency = "PHP";
  }
  addMoney(money){
    this.receivedAmount.setValue(money);
  }
  updateChange(data){
    if(data < this.totalVal){
      this.change = 0;
      this.arError = "Please Input higher amount";
    }else{
      this.change = data - this.totalVal;
      this.change = this.change.toFixed(2);
      this.arError = undefined;
    }
  }
  changeCurrency(){
    if(this.currency === "PHP"){
      this.currency = "USD";
    }else{
      this.currency = "PHP";
    }
  }
  save(){
    this.transaction = {items: this.items};
    console.log(this.transaction);
  }
  getPatient(value){
    this.patient = value;
  }
  resetPatient(){
    this.patient = undefined;
  }
}
