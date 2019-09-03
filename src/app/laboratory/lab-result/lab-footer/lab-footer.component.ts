import { Component, OnInit, Input } from '@angular/core';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { medtech } from 'src/app/services/service.interface';

@Component({
  selector: 'lab-footer',
  templateUrl: './lab-footer.component.html',
  styleUrls: ['./lab-footer.component.scss']
})
export class LabFooterComponent implements OnInit {

  @Input() mt: medtech;
  @Input() qc: medtech;
  @Input() path: medtech;


  constructor(
    private LS: LaboratoryService,
  ) { }

  ngOnInit() {

  }

}
