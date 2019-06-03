import { Component, OnInit, Input, Inject } from '@angular/core';
import { company, patient } from 'src/app/services/service.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { MathService } from 'src/app/services/math.service';
import { PatientService } from 'src/app/services/patient.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  patientForm: any;
  title;
  patient: any;
  _confirm: any;
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 10;
  }
  d = new DatePipe('en-US');
  patCompany: any;

  constructor(
    private fb: FormBuilder, 
    private iS: ItemService,
    public math: MathService,
    private pat: PatientService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PatientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public patInfo: any ) 
    { 
      
    //console.log(this.patInfo)
    if(this.patInfo.lastName || this.patInfo.firstName){
      this.iS.getCompanyByID(this.patInfo.companyID)
      .subscribe(data => this.patCompany = data[0]);
                 
      this.patientForm = this.fb.group({
        'patientID'     : [this.patInfo.patientID],
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
        'sid'           : [''],
        'patientRef'    : [''],
        'dateUpdate'    : ['00-00-00'],
        'creationDate'  : [this.d.transform(new Date(),"yyyy-MM-dd")],
        'patientType'   : [''],
        'notes'         : ['']
      });
      this.title = "Add Patient";
    }   
  }

  ngOnInit() {
    if(!this.patInfo.patientRef){
      //Generate random numbers and check patient ref for duplicate  
      this.pat.getPatient("getPatient")
      .subscribe(data =>
        this.getRN(this.math.checkRef(data)) 
      );
    } 
  }
  getRN(data){
    this.patientForm.get('patientRef').setValue(data);
  }
  //get company select emited value
  getCompany(value){
    this.patientForm.get("companyName").setValue(value.nameCompany);
  }
  savePatient(){
    // convert date to default date string
    if(this.patientForm.get("birthdate").value.toDateString){
      const bdate = this.patientForm.get("birthdate").value;
      var bday = this.math.convertDate(bdate);
      this.patientForm.get("birthdate").setValue(bday);
    }
    if(this.patInfo.patientID){
      //open confirm dialog
      const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '20%',
        data: {Title: "Are you sure?", Content: "This Patient will be updated!!!"}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result == "ok"){
          // save new patient
          this.pat.updatePatient(this.patientForm.value).subscribe(
            (data: patient) => {
              console.log(data);
            },
            (error: any) => console.log(error)
          );
          this.dialogRef.close({
            message : "Patient information updated successfully",
            status  : "ok", 
            data    : this.patientForm.value
          });
        }
      }); 
    }else{
      //open confirm dialog
      const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '20%',
        data: {Title: "Are you sure?", Content: "New Patient will be save to database."}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result == "ok"){
          // save new patient
          this.pat.addPatient(this.patientForm.value).subscribe(
            (data: patient) => {
              console.log(data);
            },
            (error: any) => console.log(error)
          );
          this.dialogRef.close({
            message : "Patient Successfully Added",
            status  : "ok", 
            data    : this.patientForm.value
          });
        }
      });  
    }
    
    
  }
}
