import { Component, OnInit, Inject } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  itemName: string = "";
  description: string = "";
  price: number = 0;
  itemType: string;
  neededTest: number;

  constructor(
    public IS : ItemService,
    public dialogRef: MatDialogRef<CreateItemComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any
  ) { }

  ngOnInit() {
    if(this.id != "undefined"){
      this.IS.getItemByID(this.id).subscribe( item => {
        this.itemName = item[0].itemName;
        this.description = item[0].itemDescription;
        this.price = item[0].itemPrice;
        this.itemType = item[0].itemType;
        this.neededTest = item[0].neededTest;
      })
    }
  }

}
