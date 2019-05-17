import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { itemList } from 'src/app/services/service.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'item-box',
  templateUrl: './item-box.component.html',
  styleUrls: ['./item-box.component.scss']
})
export class ItemBoxComponent implements OnInit {
  @Input() itemInfo: itemList[];
  @Output() deleteThis = new EventEmitter();
  public discount: FormControl = new FormControl();
  public quantity: FormControl = new FormControl();
  
  deleteItem(){
    this.deleteThis.emit(this.itemInfo);

  }

  constructor() { }

  ngOnInit() {
    this.discount.setValue(0);
    this.quantity.setValue(0);
    this.discount.valueChanges.subscribe(data => console.log(data));
  }

}
