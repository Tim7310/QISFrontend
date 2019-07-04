import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { MathService } from 'src/app/services/math.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-manage-package',
  templateUrl: './manage-package.component.html',
  styleUrls: ['./manage-package.component.scss']
})
export class ManagePackageComponent implements OnInit {

  constructor(
    private math: MathService,
    private IS: ItemService,
    
  ) { 
    this.math.navSubs("cashier");
  }

  ngOnInit() {
    // window.addEventListener("afterprint", function(event) { 
    //   let router = ActivatedRoute;
    //   router.navigate("/cashier/sales");
    // });
  }

}
