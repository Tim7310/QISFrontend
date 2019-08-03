import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'app-priv-error',
  templateUrl: './priv-error.component.html',
  styleUrls: ['./priv-error.component.scss']
})
export class PrivErrorComponent implements OnInit {

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
