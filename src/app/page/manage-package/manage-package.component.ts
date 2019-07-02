import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'app-manage-package',
  templateUrl: './manage-package.component.html',
  styleUrls: ['./manage-package.component.scss']
})
export class ManagePackageComponent implements OnInit {

  constructor(
    private math: MathService,
    private IS: ItemService
  ) { }

  ngOnInit() {
    this.math.navSubs("cashier");
  }

}
