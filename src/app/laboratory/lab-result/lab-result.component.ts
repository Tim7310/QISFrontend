import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MathService } from 'src/app/services/math.service';
import { PatientService } from 'src/app/services/patient.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { patient, transaction, medtech, microscopy, hematology, chemistry } from 'src/app/services/service.interface';
import { LaboratoryService } from 'src/app/services/laboratory.service';

@Component({
  selector: 'lab-result',
  templateUrl: './lab-result.component.html',
  styleUrls: ['./lab-result.component.scss']
})
export class LabResultComponent implements OnInit {
  id: string[];
  idDetails: Promise<any>[];
  patient: patient;
  transaction: transaction;
  path: medtech;
  qc: medtech;
  mt: medtech;
  microscopy: microscopy;
  hematology: hematology;
  chemistry: chemistry;

  constructor(
    route: ActivatedRoute,
    private math: MathService,
    private PS: PatientService,
    private TS: TransactionService,
    private LS: LaboratoryService
  ) {
    this.id = route.snapshot.params['ids']
      .split(',');
  }

  ngOnInit() {
    this.idDetails = this.id
      .map(id => this.getInvoiceDetails(id));

    Promise.all(this.idDetails)
      .then(() => {
        this.math.onLabReady();
      });
    if (this.id[0]) {
      this.TS.getOneTrans("getTransaction/" + this.id[0]).subscribe(
        trans => {
          this.transaction = trans[0];
          this.PS.getOnePatient("getPatient/" + trans[0].patientId).subscribe(
            pat => {
              this.patient = pat[0];
            }
          )
          if (this.id[1] == "microscopy") {
            this.LS.getMicroscopy(this.id[0]).subscribe(
              mic => {
                this.microscopy = mic[0];
                
                // medtech
                this.LS.getPersonnel(mic[0].medID).subscribe(
                  med => {
                    this.mt = med[0];
                  }
                )
                // Quality Control
                this.LS.getPersonnel(mic[0].qualityID).subscribe(
                  med => {
                    this.qc = med[0];
                  }
                )
                // pathology
                this.LS.getPersonnel(mic[0].pathID).subscribe(
                  med => {
                    this.path = med[0];
                  }
                )

              }
            )
          }
          if(this.id[1] == "hematology") {
            this.LS.getHematology(this.id[0]).subscribe(
              hema => {
                this.hematology = hema[0];
                
                // medtech
                this.LS.getPersonnel(hema[0].medID).subscribe(
                  med => {
                    this.mt = med[0];
                  }
                )
                // Quality Control
                this.LS.getPersonnel(hema[0].qualityID).subscribe(
                  med => {
                    this.qc = med[0];
                  }
                )
                // pathology
                this.LS.getPersonnel(hema[0].pathID).subscribe(
                  med => {
                    this.path = med[0];
                  }
                )

              }
            )
          }
          if(this.id[1] == "chemistry") {
            this.LS.getChemistry(this.id[0]).subscribe(
              chem => {
                this.chemistry = chem[0];
                
                // medtech
                this.LS.getPersonnel(chem[0].medID).subscribe(
                  med => {
                    this.mt = med[0];
                  }
                )
                // Quality Control
                this.LS.getPersonnel(chem[0].qualityID).subscribe(
                  med => {
                    this.qc = med[0];
                  }
                )
                // pathology
                this.LS.getPersonnel(chem[0].pathID).subscribe(
                  med => {
                    this.path = med[0];
                  }
                )

              }
            )
          }
        }
      )
    }

  }

  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({ amount }), 1000)
    );
  }



}
