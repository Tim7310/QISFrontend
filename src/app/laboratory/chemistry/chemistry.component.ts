import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'app-chemistry',
  templateUrl: './chemistry.component.html',
  styleUrls: ['./chemistry.component.scss']
})
export class ChemistryComponent implements OnInit {

  constructor(
    private math: MathService
  ) { 
    this.math.navSubs("lab");
  }

  ngOnInit() {
  }

}
