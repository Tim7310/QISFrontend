import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { medtech, transaction } from 'src/app/services/service.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chemistry-form',
  templateUrl: './chemistry-form.component.html',
  styleUrls: ['./chemistry-form.component.scss']
})
export class ChemistryFormComponent implements OnInit {

  id: any;
  medtech: medtech[];
  transaction: transaction;
  update: boolean = false;
  
  foo = ["NEGATIVE", "POSITIVE"];

  chem = new FormGroup({
    chemID: new FormControl(undefined),
    transactionID: new FormControl(""),
    patientID: new FormControl(""),

    pathID: new FormControl('5', [Validators.required]),
    medID: new FormControl('1', [Validators.required]),
    qualityID: new FormControl('2', [Validators.required]),

    creationDate: new FormControl("0000-00-00 00:00:00"),
    dateUpdate: new FormControl("0000-00-00 00:00:00"),

    fbs: new FormControl(""),
    fbscon: new FormControl(""),

    rbs: new FormControl(""),
    rbscon: new FormControl(""),

    bua: new FormControl(""),
    buacon: new FormControl(""),

    bun: new FormControl(""),
    buncon: new FormControl(""),

    crea: new FormControl(""),
    creacon: new FormControl(""),

    hb: new FormControl(""),

    alp: new FormControl(""),

    ggtp: new FormControl(""),

    ldh: new FormControl(""),

    calcium: new FormControl(""),

    protein: new FormControl(""),

    inPhos: new FormControl(""),

    albumin: new FormControl(""),

    globulin: new FormControl(""),

    magnesium: new FormControl(""),

    chol: new FormControl(""),
    cholcon: new FormControl(""),
    trig: new FormControl(""),
    trigcon: new FormControl(""),
    hdl: new FormControl(""),
    hdlcon: new FormControl(""),
    ldl: new FormControl(""),
    ldlcon: new FormControl(""),
    ch: new FormControl(""),
    vldl: new FormControl(""),

    ionCalcium: new FormControl(""),

    agratio: new FormControl(""),

    ogtt1: new FormControl(""),
    ogtt1con: new FormControl(""),
    ogtt2: new FormControl(""),
    ogtt2con: new FormControl(""),

    ogct: new FormControl(""),
    ogctcon: new FormControl(""),
    
    na: new FormControl(""),   
    k: new FormControl(""),
    cl: new FormControl(""),

    alt: new FormControl(""),
    ast: new FormControl(""), 
    amylase: new FormControl(""), 
    lipase: new FormControl(""),

    cpkmb: new FormControl(""),
    totalCPK: new FormControl(""),
    cpkmm: new FormControl(""),
    
    biltotal: new FormControl(""),
    bildirect: new FormControl(""),
    bilindirect: new FormControl(""),   

    chemNotes: new FormControl(""),
  
    
    psa: new FormControl(""),
  });

  constructor(
    private math: MathService,
    private lab: LaboratoryService,
    private TS: TransactionService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.math.navSubs("lab");

    this.id = this.route.snapshot.paramMap.get('id');

    if (isNaN(this.id)) {
      this.router.navigate(['error/404']);
    }
  }

  ngOnInit() {
    this.lab.getMedtech().subscribe(
      medtech => {
        this.medtech = medtech;
      }
    )

    this.TS.getOneTrans("getTransaction/" + this.id).subscribe(
      data => {
        if (data[0].length == 0) {
          this.router.navigate(['error/404']);
        } else {
          this.transaction = data[0];

          this.chem.controls.transactionID.setValue(data[0].transactionId);
          this.chem.controls.patientID.setValue(data[0].patientId);

          this.lab.getChemistry(data[0].transactionId).subscribe(
            chem => {
              if (chem.length != 0) {
                this.update = true;
                for (var i in chem[0]) {

                  this.chem.get(i).setValue(chem[0][i]);
                  
                }
              }
            }
          )
        }
      }
    )
  }

}
