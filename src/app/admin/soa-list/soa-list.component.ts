import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ItemService } from 'src/app/services/item.service';
import { billing, transaction, personnel, accPayment } from 'src/app/services/service.interface';
import { AccountingService } from 'src/app/services/accounting.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { PaymentComponent } from '../element/payment/payment.component';
import { __values } from 'tslib';
import { MathService } from 'src/app/services/math.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'soa-list',
  templateUrl: './soa-list.component.html',
  styleUrls: ['./soa-list.component.scss']
})
export class SoaListComponent implements OnInit {

  displayedColumns: string[] = ['billID', 'soaCode', 'prepared', 'verified', 'soaDate', 'debit', 'action'];
  dataSource: MatTableDataSource<billing>;

  trans: transaction[];
  personnel: personnel[];
  accounting: accPayment[];
  
  d = new DatePipe('en-US');
  monthVal  : FormControl = new FormControl(this.d.transform(new Date(),"MM"));
  yearVal   : FormControl = new FormControl(this.d.transform(new Date(),"yyyy"));

  @Input() type;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<SoaListComponent>,
    private math: MathService,
    private dialog: MatDialog,
    private AS: AccountingService,
    private TS: TransactionService
  ) { 
  }

  ngOnInit() {
    this.monthVal.disable();
    this.yearVal.disable();
    this.AS.getAccPay().subscribe(acc => {
      this.accounting = acc;
    })

    this.AS.getPersonnel().subscribe(
      person => {
        this.personnel = person;
      }
    )
   this.getbillData();
  }

  getbillData(){
    this.AS.getBilling().subscribe(bills => {
      this.dataSource = new MatTableDataSource(bills);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPersonnel(id: number) {
    let found = this.personnel.find(person => person.personnelID === id);
    if(found){
      return found.firstName + " " + found.middleName + " " + found.lastName;
    }else{
      return "";
    }    
  }

  getDebit(id){
    let found = this.accounting.find(acc => acc.apID === id);
    if(found){
      return found.debit;
    }else{
      return 0;
    } 
  }

  payment(id){
    let dial = this.dialog.open(PaymentComponent, {
      data: {id: id, type: 0}
    })

    dial.afterClosed().subscribe(res => {
      if(res){
        this.math.openSnackBar(res.message,res.status);
      }
      
    })
  }
}
