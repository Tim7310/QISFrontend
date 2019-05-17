import { Component, OnInit, Input, Output } from '@angular/core';
import { itemList } from 'src/app/services/service.interface';
import { EventEmitter } from 'events';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'item-box',
  templateUrl: './item-box.component.html',
  styleUrls: ['./item-box.component.scss']
})
export class ItemBoxComponent implements OnInit {
  @Input() itemInfo: itemList[];
  @Output() deleteThis = new EventEmitter();
  item: FormControl = new FormControl();
  deleteItem(){
    this.deleteThis.emit(this.item.value);
  }

  constructor() { }

  ngOnInit() {
    this.item.setValue(this.itemInfo[10]);
  }

}
