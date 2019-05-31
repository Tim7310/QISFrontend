import { Component, OnInit, Input, Inject } from '@angular/core';
import { company, patient } from 'src/app/services/service.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { MathService } from 'src/app/services/math.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  patientForm: any;
  title;
  patient: any;
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 10;
  }
  private patCompany: any;

  constructor(
    private fb: FormBuilder, 
    private iS: ItemService,
    public math: MathService,
    private pat: PatientService,
    public dialogRef: MatDialogRef<PatientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public patInfo: any ) 
    { 
     
    //console.log(this.patInfo)
    if(this.patInfo.lastName || this.patInfo.firstName){
      this.iS.getCompanyByID(this.patInfo.companyID)
      .subscribe(data => this.patCompany = data[0]);

      this.patientForm = this.fb.group({
        'companyName'   : [this.patInfo.companyName],
        'position'      : [this.patInfo.position],
        'firstName'     : [this.patInfo.firstName, Validators.required],
        'middleName'    : [this.patInfo.middleName, Validators.required],
        'lastName'      : [this.patInfo.lastName, Validators.required],
        'address'       : [this.patInfo.address, Validators.required],
        'gender'        : [this.patInfo.gender, Validators.required],
        'birthdate'     : [this.patInfo.birthdate, Validators.required],
        'age'           : [this.patInfo.age, Validators.required],
        'contactNo'     : [this.patInfo.contactNo, Validators.required],
        'email'         : [this.patInfo.email],
        'patientBiller' : [this.patInfo.patientBiller],
        'sid'           : [this.patInfo.sid],
        'patientRef'    : [this.patInfo.patientRef],
        'dateUpdate'    : [this.patInfo.dateUpdate],
        'creationDate'  : [this.patInfo.creationDate],
        'patientType'   : [this.patInfo.patientType],
        'notes'         : [this.patInfo.notes]
      });
      this.title = "Edit Patient Information";
    }else{
      this.patientForm = this.fb.group({
        'companyName'   : [''],
        'position'      : [''],
        'firstName'     : ['', Validators.required],
        'middleName'    : ['', Validators.required],
        'lastName'      : ['', Validators.required],
        'address'       : ['', Validators.required],
        'gender'        : ['', Validators.required],
        'birthdate'     : ['', Validators.required],
        'age'           : ['', Validators.required],
        'contactNo'     : ['', Validators.required],
        'email'         : ['', Validators.email],
        'patientBiller' : [''],
        'sid'           : [''],
        'patientRef'    : ['12312312'],
        'dateUpdate'    : ['10-10-10'],
        'creationDate'  : ['10-10-10'],
        'patientType'   : [''],
        'notes'         : ['']
      });
      this.title = "Add Patient";
    }   
  }

  ngOnInit() {
    const randomNum = this.math.randomNumber();
    this.patientForm.get('patientRef').setValue(randomNum);
    console.log(this.patCompany);
  }
  getCompany(value){
    this.patientForm.get("companyName").setValue(value.nameCompany);
  }
  getBiller(value){
    this.patientForm.get("biller").setValue(value.nameCompany);
  }
  savePatient(){
    if(this.patientForm.get("birthdate").value.toDateString){
      const bdate = this.patientForm.get("birthdate").value;
      var bday = this.math.convertDate(bdate);
      this.patientForm.get("birthdate").setValue(bday);
    }
    
    this.pat.addPatient(this.patientForm.value).subscribe(
      (data: patient) => {
        console.log(data);
      },
      (error: any) => console.log(error)
    );
    
  }
  close(){
    this.dialogRef.close();
  }
}
