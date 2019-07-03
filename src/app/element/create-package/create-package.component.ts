import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { MathService } from 'src/app/services/math.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { itemList } from 'src/app/services/service.interface';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent implements OnInit {
package = new FormGroup({
    packageName        : new FormControl("",[Validators.required]),
    packagePrice       : new FormControl("",[Validators.required]),
    packageDescription : new FormControl("",[Validators.required]),
    packageType        : new FormControl("",[Validators.required]),
    deletedPackage     : new FormControl(0,[]),
    creationDate    : new FormControl("0000-00-00 00:00:00",[]),
    dateUpdate      : new FormControl("0000-00-00 00:00:00",[]),
})
items: itemList[] = [];

constructor(
  public IS     : ItemService,
  private math  : MathService,
  public dialog : MatDialog,
  public dialogRef: MatDialogRef<CreatePackageComponent>,
  @Inject(MAT_DIALOG_DATA) public id: any
) { }

ngOnInit() {
  if(this.id != "undefined"){
    this.IS.getPack("getPackageName/" + this.id).subscribe( pack => {
      this.package.get("packageName").setValue(pack[0].packageName);
      this.package.get("packageDescription").setValue(pack[0].packageDescription);
      this.package.get("packagePrice").setValue(pack[0].packagePrice);
      this.package.get("packageType").setValue(pack[0].packageType);
      this.package.get("creationDate").setValue(pack[0].creationDate);
    });
    this.IS.getPackExt(this.id).subscribe( ext => {
      ext.forEach(data => {
        this.IS.getItemByID(data.itemID).subscribe( item => {
          this.items.push(item[0]);
        })
      });
    });
  }
}

getItem(value){
  let found = this.items.find(item => item.itemId === value.itemId);
    if(found === undefined){
      this.items.push(value);
    }
}

removeItem(value){
  this.items.splice( this.items.indexOf(value), 1 );
}

create(){
  this.package.get("creationDate").setValue(this.math.dateNow());

  const dialogRef = this.dialog.open(ConfirmComponent, {
    width: '20%',
    data: {Title: "Are you sure?", Content: "New Package will be save to database."}
  });
  
  dialogRef.afterClosed().subscribe(result => {
    if(result == "ok"){
      // save new package
      this.IS.addPackage(this.package.value).subscribe(
        (data: any) => {
          if(data == 1){
            this.items.forEach((data, index) => {
              const packName = this.package.get("packageName").value;
              this.IS.addPackext({ packageName: packName, itemID: data.itemId })
                .subscribe(res => {
                    if(res == 1){
                      if(this.items.length == index + 1){
                        this.dialogRef.close({
                          message : "New package successfully saved.",
                          status  : "ok",
                          item    : this.package.value
                        });
                      }
                    }                
                })
            })
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
  this.package.get("dateUpdate").setValue(this.math.dateNow()); 

  const dialogRef = this.dialog.open(ConfirmComponent, {
    width: '20%',
    data: {Title: "Are you sure?", Content: "Package will be updated!!!"}
  });
  
  dialogRef.afterClosed().subscribe(result => {
    if(result == "ok"){
      // update package
      this.IS.updatePackage(this.package.value).subscribe(
        (data: any) => {
          if(data == 1){
            // this.items.forEach((data, index) => {
            //   const packName = this.package.get("packageName").value;
            //   this.IS.addPackext({ packageName: packName, itemID: data.itemId })
            //     .subscribe(res => {
            //         if(res == 1){
            //           if(this.items.length == index + 1){
            //             this.dialogRef.close({
            //               message : "New package successfully saved.",
            //               status  : "ok",
            //               item    : this.package.value
            //             });
            //           }
            //         }                
            //     })
            // })
            this.dialogRef.close({
              message : "package successfully Updated.",
              status  : "ok",
              item    : this.package.value
            });
          }else{
            console.log(this.package.value);
            
            this.dialogRef.close({
              message : "Package Not Updated!!!",
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
