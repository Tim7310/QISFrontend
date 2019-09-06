import { Component, OnInit, Input } from '@angular/core';
import { microscopy } from 'src/app/services/service.interface';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'microscopy-result',
  templateUrl: './microscopy-result.component.html',
  styleUrls: ['./microscopy-result.component.scss']
})
export class MicroscopyResultComponent implements OnInit {
  
  @Input() microscopy: microscopy;

  constructor(
   public math: MathService
  ) { }

  ngOnInit() {
    
  }

}
