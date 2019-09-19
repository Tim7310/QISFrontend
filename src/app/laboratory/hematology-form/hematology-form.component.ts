import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { medtech, transaction } from 'src/app/services/service.interface';
import { ConfirmComponent } from 'src/app/element/confirm/confirm.component';

@Component({
  selector: 'app-hematology-form',
  templateUrl: './hematology-form.component.html',
  styleUrls: ['./hematology-form.component.scss']
})
export class HematologyFormComponent implements OnInit {
  
  id: any;
  medtech : medtech[];
  transaction: transaction;
  update: boolean = false;

  foo = ["NEGATIVE", "POSITIVE"];

  hema = new FormGroup({

    hemaID: new FormControl(undefined),
    transactionID: new FormControl(""),
    patientID: new FormControl(""),

    pathID: new FormControl('5',[Validators.required]),
    medID: new FormControl('1', [Validators.required]),
    qualityID: new FormControl('2', [Validators.required]),

    creationDate: new FormControl("0000-00-00 00:00:00"),
    dateUpdate: new FormControl("0000-00-00 00:00:00"),

    whiteBlood: new FormControl(""),
    neutrophils: new FormControl(""),
    lymphocytes: new FormControl(""),
    monocytes: new FormControl(""),
    eos: new FormControl(""),
    bas: new FormControl(""),
    cbcrbc: new FormControl(""),
    hemoglobin: new FormControl(""),
    hematocrit: new FormControl(""),
    plt: new FormControl(""),

    esr: new FormControl(""),
    esrmethod: new FormControl(""),

    apttime: new FormControl(""),
    apttimeNV: new FormControl(""),
    aptcontrol: new FormControl(""),
    aptcontrolNV: new FormControl(""),

    bloodType: new FormControl(""),
    rh: new FormControl(""),

    clottingTime: new FormControl(""),

    bleedingTime: new FormControl(""),

    ms: new FormControl(""),

    
    ptime: new FormControl(""),
    ptimeNV: new FormControl(""),
    ptcontrol: new FormControl(""),
    ptcontrolNV: new FormControl(""),
    actPercent: new FormControl(""),
    actPercentNV: new FormControl(""),
    inr: new FormControl(""),
    inrnv: new FormControl(""),

    pr131: new FormControl(""),

    hemaNR: new FormControl(""),
    hemoNR: new FormControl(""),
   
    cbcot: new FormControl(""), 
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
    this.lab.getMedtech().subscribe(
      medtech => {
        this.medtech = medtech;
      }
    )

    this.TS.getOneTrans("getTransaction/" + this.id).subscribe(
      data => {
        if(data[0].length == 0){
          this.router.navigate(['error/404']);
        }else{
          this.transaction = data[0];
          
          this.hema.controls.transactionID.setValue(data[0].transactionId);
          this.hema.controls.patientID.setValue(data[0].patientId);  
          
          this.lab.getHematology(data[0].transactionId).subscribe(
            hema => {
              if(hema.length != 0){
                this.update = true;
                for(var i in hema[0]){

                 this.hema.get(i).setValue(hema[0][i]);                 
                }
                
              }
            }
          )
        }  
      }
    )

  }

  addHema(){
    this.hema.controls.creationDate.setValue(this.math.dateNow());

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: {Title: "Are you sure?", Content: "Data will be saved to database!"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == "ok"){
        this.lab.addHematology(this.hema.value).subscribe(
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

  updateHema(){
    this.hema.controls.dateUpdate.setValue(this.math.dateNow());

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: {Title: "Are you sure?", Content: "Data will be updated!"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == "ok"){
        this.lab.addHematology(this.hema.value, "/updateHematology").subscribe(
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
