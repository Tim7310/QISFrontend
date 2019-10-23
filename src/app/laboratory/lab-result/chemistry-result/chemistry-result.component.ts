import { Component, OnInit, Input } from '@angular/core';
import { chemistry } from 'src/app/services/service.interface';

@Component({
  selector: 'chemistry-result',
  templateUrl: './chemistry-result.component.html',
  styleUrls: ['./chemistry-result.component.scss']
})
export class ChemistryResultComponent implements OnInit {

  @Input() chemistry: chemistry;

  constructor() { }

  ngOnInit() {
  }

}
