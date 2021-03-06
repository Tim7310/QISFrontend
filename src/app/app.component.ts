import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { navList } from './services/service.interface';
import { MathService } from './services/math.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit{
  title = 'QISFrontend';
  fillerNav: navList[];
  navLink: navList[];
  isNav: boolean = true;

  private _mobileQueryListener: () => void;
  mobileQuery: any;

  constructor(
    changeDetectorRef : ChangeDetectorRef, 
    public media      : MediaMatcher,
    private math      : MathService,
    private user      : UserService,
    private auth      : AuthGuard) {

    

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.fillerNav = [
      {name: "Cashier", route: "cashier/transact", icon: "attach_money"},
      {name: "Laboratory", route: "laboratory/microscopy", icon: "business_center"},
      {name: "Imaging", route: ".", icon: "flip"},
      {name: "Quality Control", route: ".", icon: "assignment_ind"},
      {name: "Physical Examination", route: ".", icon: "assessment"},
      {name: "Nurse", route: ".", icon: "healing"}
    ];
    
  }
  ngOnInit(){
    this.math.changeEmitted$.subscribe(
      data => {
        this.navLink = data;        
      }
    )
    this.math.changeVis.subscribe(
      data => {
        this.isNav = data;
      }
    )
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout():void {
    this.user.logout();
  }
}
