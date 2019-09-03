import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { patient, transaction } from 'src/app/services/service.interface';
import { TransactionService } from 'src/app/services/transaction.service';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'lab-header',
  templateUrl: './lab-header.component.html',
  styleUrls: ['./lab-header.component.scss']
})
export class LabHeaderComponent implements OnInit {

  @Input() createdDate = "0000-00-00 00:00:00";
  @Input() patient: patient;
  @Input() transaction: transaction;

  constructor(
    public math: MathService
  ) { }

  ngOnInit() {
    console.log(this.patient);
    
  }

}
