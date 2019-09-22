import { Component, OnInit, Input } from '@angular/core';
import { hematology } from 'src/app/services/service.interface';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'hematology-result',
  templateUrl: './hematology-result.component.html',
  styleUrls: ['./hematology-result.component.scss']
})
export class HematologyResultComponent implements OnInit {

  @Input() hematology: hematology;
  
  constructor(
    public math: MathService
  ) { }

  ngOnInit() {
  }

}
