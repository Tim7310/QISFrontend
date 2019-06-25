import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { navList } from './service.interface';

@Injectable({
  providedIn: 'root'
})
export class MathService {
  isPrinting = false;
  constructor(
    private router: Router
  ) { }

  convertDate(date){
    var dateString = 
      new Date(
        date.getTime() - (date.getTimezoneOffset() * 60000 ))
        .toISOString().split("T")[0];
    return dateString;
  }
  
  randomNumber(min:number = 0, max:number = 100000000): number {
    var rn = Math.floor(Math.random() * (max - min)) + min;
    return rn;
  }
  patcheckRef(data){
    let pat = data;
    let rn;
    do{
      rn = this.randomNumber();
      var found = pat.find(data => data.patientRef == rn);
    }
    while(found !== undefined);
    return rn;
  }
  transcheckRef(data){
    let trans = data;
    let rn;
    do{
      rn = this.randomNumber();
      var found = trans.find(data => data.transactionRef == rn);
    }
    while(found !== undefined);
    return rn;
  }
  getDateNow(){
    let d = new DatePipe('en-US');
    return d.transform(new Date(),"yyyy-MM-dd H:mm:ss");
  }
  printDocument(documentName: string, documentData: string[]) {
    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentData.join()]
      }}]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }
  
  protected navObs = new Subject<navList[]>();

  changeEmitted$ = this.navObs.asObservable();

  public navSubs(change: any) {
    let list: navList[];
    if(change == "cashier"){
      list = [
        {name: "Transact", route: "cashier/transact", icon: "store"},
        {name: "Transaction List", route: "cashier/transactions", icon: "shop"},
        {name: "HMO Transaction", route: "cashier/hmo", icon: "shopping_cart"},
        // {name: "", route: "", icon: ""},
      ]
    }
    this.navObs.next(list);
  }
}
