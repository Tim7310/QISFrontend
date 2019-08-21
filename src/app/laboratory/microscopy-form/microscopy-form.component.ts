import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LaboratoryService } from 'src/app/services/laboratory.service';

@Component({
  selector: 'app-microscopy-form',
  templateUrl: './microscopy-form.component.html',
  styleUrls: ['./microscopy-form.component.scss']
})
export class MicroscopyFormComponent implements OnInit {

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
    pathID: new FormControl(""),
    medID: new FormControl(""),
    qualityID: new FormControl(""),
    creationDate: new FormControl(""),
    dateUpdate: new FormControl(""),

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
    private lab: LaboratoryService
  ) {
    this.math.navSubs("lab");
  }

  ngOnInit() {
    this.lab
  }

}
