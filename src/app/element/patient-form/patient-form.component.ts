import { Component, OnInit, Input, Inject } from '@angular/core';
import { company, patient } from 'src/app/services/service.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  patientForm: any;
//   @Input() patInfo: patient = {
//     address: "FATINA VILL. STA CRUZ",
//     position: "POKER DEALER",
//     fullName: "MENDOZA, RENETTE SIGUA",
//     patientID: 1,
//     patientRef: 43982061,
//     patientType: " ",
//     contactNo: "09054668961",
//     patientBiller: "BICYCLE POKER",
//     creationDate: "2019-02-07 13:55:45",
//     gender: "FEMALE",
//     age: 30,
//     notes: "",
//     companyName: "BICYCLE POKER",
//     birthdate: "FEB 07, 2019",
//     dateUpdate: "0000-00-00 00:00:00",
//     sid: "",
//     lastName: "MENDOZA",
//     email: "",
//     firstName: "RENETTE",
//     middleName: "SIGUA"
// };
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 10;
  }
  patCompany: company ;

  constructor(
    private fb: FormBuilder, 
    private iS: ItemService,
    public dialogRef: MatDialogRef<PatientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public patInfo: any ) 
    { 
    this.iS.getCompanyByName(patInfo.companyName)
    .subscribe(data => this.patCompany = data);
    
    if(this.patInfo !== undefined){
      this.patientForm = this.fb.group({
        'company'   : [this.patInfo.companyName],
        'position'  : [this.patInfo.position],
        'firstName' : [this.patInfo.firstName, Validators.required],
        'middleName': [this.patInfo.middleName, Validators.required],
        'lastName'  : [this.patInfo.lastName, Validators.required],
        'address'   : [this.patInfo.address, Validators.required],
        'gender'    : [this.patInfo.gender, Validators.required],
        'bday'      : [this.patInfo.birthdate, Validators.required],
        'age'       : [this.patInfo.age, Validators.required],
        'contact'   : [this.patInfo.birthdate, Validators.required],
        'email'     : [this.patInfo.email],
        'biller'    : [this.patInfo.patientBiller],
        'sid'       : [this.patInfo.sid],
      });
    }else{
      this.patientForm = this.fb.group({
        'company'   : [''],
        'position'  : [''],
        'firstName' : ['', Validators.required],
        'middleName': ['', Validators.required],
        'lastName'  : ['', Validators.required],
        'address'   : ['', Validators.required],
        'gender'    : ['', Validators.required],
        'bday'      : ['', Validators.required],
        'age'       : ['', Validators.required],
        'contact'   : ['', Validators.required],
        'email'     : ['', Validators.email],
        'biller'    : [''],
        'sid'       : [''],
      });
    }   
  }

  ngOnInit() {
    console.log(this.patCompany);
  }
  getCompany(value){
    this.patientForm.get("company").setValue(value.nameCompany);
  }
  getBiller(value){
    this.patientForm.get("biller").setValue(value.nameCompany);
  }
  savePatient(){
    console.log(this.patientForm.value);
  }
  close(){
    this.dialogRef.close();
  }
}
