import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { transaction } from 'src/app/services/service.interface';
import { TransactionService } from 'src/app/services/transaction.service';

/** Constants used to fill up our data base. */
@Component({
  selector: 'held-transaction',
  templateUrl: './held-transaction.component.html',
  styleUrls: ['./held-transaction.component.scss']
})
export class HeldTransactionComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'items', 'date','action'];
  dataSource: MatTableDataSource<transaction>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private TS: TransactionService) {
    
  }

  ngOnInit() {
    this.TS.getTransactions("getHeldTrans")
   .subscribe(
     data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }
   )   
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
