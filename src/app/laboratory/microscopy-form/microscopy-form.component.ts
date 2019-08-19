import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'app-microscopy-form',
  templateUrl: './microscopy-form.component.html',
  styleUrls: ['./microscopy-form.component.scss']
})
export class MicroscopyFormComponent implements OnInit {

  constructor(
    private math: MathService
  ) { 
    this.math.navSubs("lab");
  }

  ngOnInit() {
  }

}
