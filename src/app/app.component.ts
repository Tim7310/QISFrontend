import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { navList } from './services/service.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'QISFrontend';
  fillerNav: navList[];
 

  private _mobileQueryListener: () => void;
  mobileQuery: any;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.fillerNav = [
      {name: "Cashier", route: ".", icon: "attach_money"},
      {name: "Laboratory", route: ".", icon: "business_center"},
      {name: "Imaging", route: ".", icon: "flip"},
      {name: "Quality Control", route: ".", icon: "assignment_ind"},
      {name: "Physical Examination", route: ".", icon: "assessment"},
      {name: "Nurse", route: ".", icon: "healing"}
    ];
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
