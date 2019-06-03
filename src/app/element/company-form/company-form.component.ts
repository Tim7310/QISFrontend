import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ConfirmComponent } from '../confirm/confirm.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  company = new FormGroup({
    nameCompany: new FormControl("",[
      Validators.required,
      Validators.minLength(2)
    ]),
    companyAddress: new FormControl("")
  })
  
  constructor(
    public IS      : ItemService,
    public dialog   : MatDialog,
    public dialogRef: MatDialogRef<CompanyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public patInfo: any
  ) { }

  ngOnInit() {
  }
  add(){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: {Title: "Are you sure?", Content: "New company will be added to database."}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == "ok"){
        // save new patient
        this.IS.addCompany(this.company.value).subscribe(
          (data: any) => {
            console.log(data);
          },
          (error: any) => console.log(error)
        );
        this.dialogRef.close({
          message : "New Company successfully saved.",
          status  : "ok", 
        });
      }
    }); 
  }
}
