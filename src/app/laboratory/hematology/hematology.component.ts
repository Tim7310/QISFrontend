import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'hematology',
  templateUrl: './hematology.component.html',
  styleUrls: ['./hematology.component.scss']
})
export class HematologyComponent implements OnInit {

  constructor(
    private math: MathService
  ) { 
    this.math.navSubs("lab");
  }

  ngOnInit() {
  }

}
