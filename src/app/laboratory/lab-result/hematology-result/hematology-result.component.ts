import { Component, OnInit, Input } from '@angular/core';
import { hematology } from 'src/app/services/service.interface';

@Component({
  selector: 'hematology-result',
  templateUrl: './hematology-result.component.html',
  styleUrls: ['./hematology-result.component.scss']
})
export class HematologyResultComponent implements OnInit {

  @Input() hematology: hematology;
  
  constructor() { }

  ngOnInit() {
  }

}
