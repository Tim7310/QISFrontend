import { Component, OnInit } from '@angular/core';
import { company } from 'src/app/services/service.interface';

@Component({
  selector: 'patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    // return day !== 0 && day !== 6;
    return day !== 10;
  }
  patCompany: company = {
    "companyAddress": "",
    "companyID": 2,
    "nameCompany": "AIZHA D. FLORES, MD"
  }
  constructor() { }

  ngOnInit() {
  }
  getCompany(value){
    console.log(value);
  }
  getBiller(value){
    console.log(value);
  }
  onClick(){

  }
}
