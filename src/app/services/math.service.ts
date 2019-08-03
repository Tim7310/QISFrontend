import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { navList } from './service.interface';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';



@Injectable({
  providedIn: 'root'
})
export class MathService {
  isPrinting = false;
  constructor(
    private router: Router,
    public _snackBar: MatSnackBar
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
  printReport(documentName: string, documentData: string[]) {
    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
        'salesReport': ['print', documentData.join()]
      }}]);
  }

  printBilling(documentName: string, documentData: string[]) {
    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
        'billing': ['print', documentData.join()]
      }}]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }
  onReportReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { salesReport: null }}]);
    });
  }

  onBillingReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { billing: null }}]);
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
        {name: "Sales Report", route: "cashier/sales", icon: "assessment"},
        {name: "Manage Items", route: "cashier/manage-items", icon: "settings_applications"},
        {name: "Refund", route: "cashier/refund-exchange", icon: "compare_arrows"},
        // {name: "", route: "", icon: ""},
      ]
    }
    if(change == "admin"){
      list = [
        {name: "Manage User", route: "admin/manage-user", icon: "assignment_ind"},
        {name: "Billing", route: "admin/billing", icon: "library_add"},
        {name: "Account Payment", route: "admin/account-payment", icon: "library_books"},
      ]
    }
    this.navVis.next(true);
    this.navObs.next(list);
  }

  protected navVis = new Subject<boolean>();

  changeVis = this.navVis.asObservable();

  public navVisibility(change: boolean) {
    this.navVis.next(change);
  }

  computeDisc(price:number, disc: number, qty: number){
    let discount: number = disc / 100;
    discount = price * discount;
    let total = price - discount;
    total = total * qty;
    return total.toFixed(2);
  }

  dateNow(){
    let d = new DatePipe('en-US');
    let datenow = d.transform(new Date(),"yyyy-MM-dd HH:mm:ss");
    return datenow;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  computeAge(dob: any): number{
    return moment().diff(dob, 'years');
  }
}
