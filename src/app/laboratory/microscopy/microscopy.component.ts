import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'microscopy',
  templateUrl: './microscopy.component.html',
  styleUrls: ['./microscopy.component.scss']
})
export class MicroscopyComponent implements OnInit {

  constructor(
    private math: MathService
  ) { 
    this.math.navSubs("lab");
  }

  ngOnInit() {
  }

}
