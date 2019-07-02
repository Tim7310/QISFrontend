import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { MathService } from 'src/app/services/math.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

constructor(
  public IS     : ItemService,
  private math  : MathService,
  public dialog : MatDialog,
  public dialogRef: MatDialogRef<CreatePackageComponent>,
  @Inject(MAT_DIALOG_DATA) public id: any
) { }

ngOnInit() {
  if(this.id != "undefined"){
    this.IS.getPack(this.id).subscribe( pack => {
      this.package.get("packageName").setValue(pack[0].packageName);
      this.package.get("packageDescription").setValue(pack[0].packageDescription);
      this.package.get("packagePrice").setValue(pack[0].packagePrice);
      this.package.get("packageType").setValue(pack[0].packageType);
      this.package.get("creationDate").setValue(pack[0].creationDate);
    })
  }
}

// create(){
//   this.package.get("creationDate").setValue(this.math.dateNow());

//   const dialogRef = this.dialog.open(ConfirmComponent, {
//     width: '20%',
//     data: {Title: "Are you sure?", Content: "New Item will be save to database."}
//   });
  
//   dialogRef.afterClosed().subscribe(result => {
//     if(result == "ok"){
//       // save new patient
//       this.IS.addItem(this.item.value).subscribe(
//         (data: any) => {
//           if(data == 1){
//             this.dialogRef.close({
//               message : "New item successfully saved.",
//               status  : "ok",
//               item    : this.item.value
//             });
//           }else{
//             this.dialogRef.close({
//               message : "Item Not Saved!!!",
//               status  : "cancel", 
             
//             });
//           }
//         },
//         (error: any) => console.log(error)
//       );
      
//     }
//   }); 
// }

// update(){
//   this.item.get("dateUpdate").setValue(this.math.dateNow()); 

//   const dialogRef = this.dialog.open(ConfirmComponent, {
//     width: '20%',
//     data: {Title: "Are you sure?", Content: "New Item will be save to database."}
//   });
  
//   dialogRef.afterClosed().subscribe(result => {
//     if(result == "ok"){
//       // save new patient
//       this.IS.updateItem(this.item.value).subscribe(
//         (data: any) => {
//           if(data == 1){
//             this.dialogRef.close({
//               message : "Item updated successfully.",
//               status  : "ok", 
//               item    : this.item.value
//             });
//           }else{
//             this.dialogRef.close({
//               message : "Item failed to update!!!",
//               status  : "cancel", 
//             });
//           }
//         },
//         (error: any) => console.log(error)
//       );
      
//     }
//   }); 
// }

}
