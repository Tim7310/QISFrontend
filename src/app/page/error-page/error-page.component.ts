import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor(
    public  route : Router,
    private math: MathService
    ) {
      this.math.navVisibility(false);
     }

  ngOnInit() {
    
  }
  redirect(){
    this.route.navigate(['authentication/signin']);
  }
}
