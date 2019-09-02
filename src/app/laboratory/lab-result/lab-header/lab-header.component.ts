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

  @Input() id;
  @Input() createdDate = "0000-00-00 00:00:00";
  patient: patient;
  transaction: transaction;

  constructor(
    private PS: PatientService,
    private TS: TransactionService,
    public math: MathService
  ) { }

  ngOnInit() {
    if(this.id){
      this.TS.getOneTrans("getTransaction/" + this.id).subscribe(
        trans => {
          this.transaction = trans[0];
          this.PS.getOnePatient("getPatient/" + trans[0].patientId).subscribe(
            pat => {
              this.patient = pat[0];
            }
          )
        }
      )
    }
  }

}
