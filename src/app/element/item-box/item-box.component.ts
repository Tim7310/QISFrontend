import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { itemList, total } from 'src/app/services/service.interface';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'item-box',
  templateUrl: './item-box.component.html',
  styleUrls: ['./item-box.component.scss']
})
export class ItemBoxComponent implements OnInit, OnChanges {
  @Input() itemInfo: itemList;
  itemForm : FormGroup;
  @Input() discount: number = 0;
  @Output() deleteThis = new EventEmitter();
  @Output() getTotal = new EventEmitter(); 
  total: total = {
    id        : 0, 
    price     : 0, 
    subtotal  : 0,
    discount  : 0,
    quantity  : 0
  }; 
  
  deleteItem(){
    this.deleteThis.emit(this.itemInfo);
  }

  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      discount: [this.discount],
      quantity: [1],
      total: [{
        value: null,
        disabled: true
      }] 
    });
   }

  ngOnInit() {
    this.computeTotal()
    this.total.id = this.itemInfo.itemId;
    this.total.subtotal = this.itemInfo.itemPrice;
    this.total.quantity = this.itemForm.get('quantity').value;
    this.total.discount = this.itemForm.get('discount').value;
    this.getTotal.emit(this.total);
    this.itemForm.controls['discount'].setValue(this.discount);
    // this.computeTotal();
    this.itemForm.controls['quantity'].valueChanges.subscribe(data => this.computeTotal());
    this.itemForm.controls['discount'].valueChanges.subscribe(data => this.computeTotal());
    this.itemForm.controls['total'].valueChanges.subscribe
      (data => this.emitTotal(data));
  }
  ngOnChanges(changes: SimpleChanges): void {
    let disc = changes.discount.currentValue;
    this.itemForm.get("discount").setValue(disc);
  }
  
  computeTotal(){
    let compTotal =  this.itemInfo.itemPrice * this.itemForm.get('quantity').value;
    let disc = this.itemForm.get('discount').value / 100 * compTotal;
    compTotal = compTotal - disc;
    this.itemForm.controls['total'].setValue(compTotal);
    this.total.price = compTotal;
  }
  emitTotal(value){
    this.total.price = value;
    this.total.subtotal = this.itemInfo.itemPrice * this.itemForm.get('quantity').value;
    this.total.quantity = this.itemForm.get('quantity').value;
    this.total.discount = this.itemForm.get('discount').value;
    this.getTotal.emit(this.total);
  }

}
