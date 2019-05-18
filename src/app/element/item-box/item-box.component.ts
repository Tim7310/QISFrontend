import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { itemList } from 'src/app/services/service.interface';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'item-box',
  templateUrl: './item-box.component.html',
  styleUrls: ['./item-box.component.scss']
})
export class ItemBoxComponent implements OnInit {
  @Input() itemInfo: itemList;
  itemForm : FormGroup;
  @Input() discount: number;
  @Output() deleteThis = new EventEmitter();
  
  
  deleteItem(){
    this.deleteThis.emit(this.itemInfo);
  }

  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      discount: [this.discount],
      quantity: [1],
      total: [] 
    });
   }

  ngOnInit() {
    this.computeTotal()
    // this.computeTotal();
    this.itemForm.controls['quantity'].valueChanges.subscribe(data => this.computeTotal());
    this.itemForm.controls['discount'].valueChanges.subscribe(data => this.computeTotal());
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
  }

}
