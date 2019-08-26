import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { medtech, transaction } from 'src/app/services/service.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { ConfirmComponent } from 'src/app/element/confirm/confirm.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-microscopy-form',
  templateUrl: './microscopy-form.component.html',
  styleUrls: ['./microscopy-form.component.scss']
})
export class MicroscopyFormComponent implements OnInit {

  id: any;
  medtech : medtech[];
  transaction: transaction;
  update: boolean = false;

  urineColor = ["STRAW", "LIGHT YELLOW", "YELLOW", "DARK YELLOW", "RED", "ORANGE", "AMBER"];
  urineTransparency = ["CLEAR", "HAZY", "SL. TURBID", "TURBID"];
  ucValue = ["NEGATIVE", "TRACE", "1+", "2+", "3+", "4+"];
  ucpH = ["5.0", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0", "9.5"];
  ucSPG = ["1.000", "1.005", "1.010", "1.015", "1.020", "1.025", "1.030",];
  microscopicVal = ["RARE", "FEW", "MODERATE", "MANY"];

  fecColor = ["GREEN", "YELLOW", "LIGHT BROWN", "BROWN", "DARK BROWN"];
  fecCons = ["FORMED", "SEMI-FORMED", "SOFT", "WATERY", "SLIGHTLY MUCOID", "MUCOID"];

  foo = ["NEGATIVE", "POSITIVE"];

  micro = new FormGroup({

    microID: new FormControl(undefined),
    transactionID: new FormControl(""),
    patientID: new FormControl(""),

    pathID: new FormControl('5',[Validators.required]),
    medID: new FormControl('1', [Validators.required]),
    qualityID: new FormControl('2', [Validators.required]),

    creationDate: new FormControl("0000-00-00 00:00:00"),
    dateUpdate: new FormControl("0000-00-00 00:00:00"),

    uriColor: new FormControl(""),
    uriTrans: new FormControl(""),
    uriOt: new FormControl(""),

    uriPh: new FormControl(""),
    uriSp: new FormControl(""),
    uriPro: new FormControl(""),
    uriGlu: new FormControl(""),
    le: new FormControl(""),
    nit: new FormControl(""),
    uro: new FormControl(""),
    bld: new FormControl(""),
    ket: new FormControl(""),
    bil: new FormControl(""),

    rbc: new FormControl(""),
    wbc: new FormControl(""),
    ecells: new FormControl(""),
    mthreads: new FormControl(""),
    bac: new FormControl(""),
    amorph: new FormControl(""),
    coAx: new FormControl(""),

    fecColor: new FormControl(""),
    fecCon: new FormControl(""),
    fecOt: new FormControl(""),
    fecMicro: new FormControl(""),   

    pregTest: new FormControl(""),

    occultBLD: new FormControl(""),

    afbva1: new FormControl(""),
    afbva2: new FormControl(""),
    afbr1: new FormControl(""),
    afbr2: new FormControl(""),
    afbd: new FormControl("")
  })

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
    
    if(isNaN(this.id)){
      this.router.navigate(['error/404']); 
    }
  }

  ngOnInit() {

    this.TS.getOneTrans("getTransaction/" + this.id).subscribe(
      data => {
        if(data[0].length == 0){
          this.router.navigate(['error/404']);
        }else{
          this.transaction = data[0];
          
          this.micro.controls.transactionID.setValue(data[0].transactionId);
          this.micro.controls.patientID.setValue(data[0].patientId);  
          
          this.lab.getMicroscopy(data[0].transactionId).subscribe(
            micro => {
              if(micro.length != 0){
                this.update = true;
                for(var i in micro[0]){
                 this.micro.get(i).setValue(micro[0][i]);
                }
                
              }
            }
          )
        }  
      }
    )

    this.lab.getMedtech().subscribe(
      medtech => {
        this.medtech = medtech;
      }
    )
  }

  addMicro(){
    this.micro.controls.creationDate.setValue(this.math.dateNow());

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: {Title: "Are you sure?", Content: "Data will be saved to database!"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == "ok"){
        this.lab.addMicroscopy(this.micro.value).subscribe(
          data => {
            if(data == 1){
              this.math.openSnackBar("Data successfuly saved","ok");
            }else{
              this.math.openSnackBar("Data not saved!!!","ok");
            }
          }
        )
       }

    })
  }

  updateMicro(){
    this.micro.controls.dateUpdate.setValue(this.math.dateNow());

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: {Title: "Are you sure?", Content: "Data will be updated!"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == "ok"){
        this.lab.addMicroscopy(this.micro.value, "/updateMicroscopy").subscribe(
          data => {
            if(data == 1){
              this.math.openSnackBar("Data successfuly update","ok");
            }else{
              this.math.openSnackBar("Error Updating data!!!","ok");
            }
          }
        )
       }

    })
    
  }

}
