import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ItemService } from 'src/app/services/item.service';
import { billing, transaction, personnel } from 'src/app/services/service.interface';
import { AccountingService } from 'src/app/services/accounting.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-soa-list',
  templateUrl: './soa-list.component.html',
  styleUrls: ['./soa-list.component.scss']
})
export class SoaListComponent implements OnInit {

  displayedColumns: string[] = ['billID', 'soaCode', 'prepared', 'verified', 'soaDate', 'action'];
  dataSource: MatTableDataSource<billing>;

  trans: transaction[];
  personnel: personnel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<SoaListComponent>,
    private dialog: MatDialog,
    private AS: AccountingService,
    private TS: TransactionService
  ) { }

  ngOnInit() {

    this.AS.getPersonnel().subscribe(
      person => {
        this.personnel = person;
      }
    )

    let bill: billing;
    let billing: billing[];
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

}
