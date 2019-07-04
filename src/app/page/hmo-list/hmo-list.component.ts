import { Component, OnInit } from '@angular/core';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'hmo-list',
  templateUrl: './hmo-list.component.html',
  styleUrls: ['./hmo-list.component.scss']
})
export class HMOListComponent implements OnInit {

  constructor(
    private math : MathService
  ) { 
    this.math.navSubs("cashier");
  }

  ngOnInit() {
    
  }


}
