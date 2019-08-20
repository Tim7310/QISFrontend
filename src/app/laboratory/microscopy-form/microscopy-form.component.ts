import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'app-microscopy-form',
  templateUrl: './microscopy-form.component.html',
  styleUrls: ['./microscopy-form.component.scss']
})
export class MicroscopyFormComponent implements OnInit {

  urineColor = ["STRAW", "LIGHT YELLOW", "YELLOW", "DARK YELLOW", "RED", "ORANGE", "AMBER"];
  urineTransparency = ["CLEAR", "HAZY", "SL. TURBID", "TURBID"];
  ucValue = ["NEGATIVE", "TRACE", "1+", "2+", "3+", "4+"];
  ucpH  = ["5.0", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0", "9.5"];
  ucSPG = ["1.000", "1.005", "1.010", "1.015", "1.020", "1.025", "1.030",];
  microscopicVal = ["RARE", "FEW", "MODERATE", "MANY"];

  fecColor = ["GREEN", "YELLOW", "LIGHT BROWN", "BROWN", "DARK BROWN"];
  fecCons = ["FORMED", "SEMI-FORMED", "SOFT", "WATERY", "SLIGHTLY MUCOID", "MUCOID"]
  constructor(
    private math: MathService
  ) { 
    this.math.navSubs("lab");
  }

  ngOnInit() {
  }

}
