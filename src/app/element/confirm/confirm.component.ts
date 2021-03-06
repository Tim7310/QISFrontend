import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PatientFormComponent } from '../patient-form/patient-form.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  Title = "Are you sure?";
  Content = "";
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public config: any) {
      if(config.Title){
        this.Title = config.Title;
        this.Content = config.Content;
      }
     }

  ngOnInit() {
  }
  ok(){
    this.dialogRef.close("ok");
  }
  cancel(rel: number = 0){
    if(rel == 1){
      location.reload();
    }
  }
}
