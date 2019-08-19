import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { patient, packList, itemList, transaction } from 'src/app/services/service.interface';
import { TransactionService } from 'src/app/services/transaction.service';
import { ItemService } from 'src/app/services/item.service';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {

  @Input() id: number;
  patient: patient;
  package: packList[] = [];
  item: itemList[] = [];
  transaction: transaction;

  constructor(
    private PS: PatientService,
    private TS: TransactionService,
    private IS: ItemService,
    public math: MathService
    ) { }

  ngOnInit() {
    if(this.id){
      this.TS.getOneTrans( "getTransaction/" + this.id ).subscribe(
        trans => {
          this.transaction = trans[0];
          // get patient information
          this.PS.getOnePatient("getPatient/" + trans[0].patientId).subscribe(
            pat => {  
              this.patient = pat[0];
            }
          )        
        }
      )
      // get Item Information 
      this.TS.getTransExt(this.id).subscribe(
        ext => {
          if(ext[0].packageName){
            this.IS.getPack("getPackageName/" + ext[0].packageName).subscribe(
              pack => {
                this.package.push(pack[0]);
              }
            )
          }
          else if(ext[0].itemID){
            this.IS.getItemByID(ext[0].itemID).subscribe(
              item => {
                this.item.push(item[0]);
              }
            )
          }
        }
      )
    }
  }

}
