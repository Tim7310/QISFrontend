import { Component, OnInit, Inject } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { itemList } from 'src/app/services/service.interface';
import { MathService } from 'src/app/services/math.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  item = new FormGroup({
      itemId          : new FormControl("",[]),
      itemName        : new FormControl("",[Validators.required]),
      itemPrice       : new FormControl("",[Validators.required]),
      itemDescription : new FormControl("",[Validators.required]),
      itemType        : new FormControl("",[Validators.required]),
      deletedItem     : new FormControl(0,[]),
      neededTest      : new FormControl("",[Validators.required]),
      creationDate    : new FormControl("0000-00-00 00:00:00",[]),
      dateUpdate      : new FormControl("0000-00-00 00:00:00",[]),
  })

  constructor(
    public IS     : ItemService,
    private math  : MathService,
    public dialog : MatDialog,
    public dialogRef: MatDialogRef<CreateItemComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any
  ) { }

  ngOnInit() {
    if(this.id != "undefined"){
      this.IS.getItemByID(this.id).subscribe( item => {
        this.item.get("itemName").setValue(item[0].itemName);
        this.item.get("itemDescription").setValue(item[0].itemDescription);
        this.item.get("itemPrice").setValue(item[0].itemPrice);
        this.item.get("itemType").setValue(item[0].itemType);
        this.item.get("neededTest").setValue(item[0].neededTest);
        this.item.get("creationDate").setValue(item[0].creationDate);
        this.item.get("itemId").setValue(item[0].itemId);
      })
    }
  }

  create(){
    this.item.get("creationDate").setValue(this.math.dateNow());

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: {Title: "Are you sure?", Content: "New Item will be save to database."}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result == "ok"){
        // save new patient
        this.IS.addItem(this.item.value).subscribe(
          (data: any) => {
            if(data == 1){
              this.dialogRef.close({
                message : "New item successfully saved.",
                status  : "ok",
                item    : this.item.value
              });
            }else{
              this.dialogRef.close({
                message : "Item Not Saved!!!",
                status  : "cancel", 
               
              });
            }
          },
          (error: any) => console.log(error)
        );
        
      }
    }); 
  }

  update(){
    this.item.get("dateUpdate").setValue(this.math.dateNow()); 

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: {Title: "Are you sure?", Content: "New Item will be save to database."}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result == "ok"){
        // save new patient
        this.IS.updateItem(this.item.value).subscribe(
          (data: any) => {
            if(data == 1){
              this.dialogRef.close({
                message : "Item updated successfully.",
                status  : "ok", 
                item    : this.item.value
              });
            }else{
              this.dialogRef.close({
                message : "Item failed to update!!!",
                status  : "cancel", 
              });
            }
          },
          (error: any) => console.log(error)
        );
        
      }
    }); 
  }

}
