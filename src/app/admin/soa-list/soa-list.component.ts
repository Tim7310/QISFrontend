import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ItemService } from 'src/app/services/item.service';
import { billing } from 'src/app/services/service.interface';
import { AccountingService } from 'src/app/services/accounting.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-soa-list',
  templateUrl: './soa-list.component.html',
  styleUrls: ['./soa-list.component.scss']
})
export class SoaListComponent implements OnInit {

  displayedColumns: string[] = ['billID', 'soaCode', 'transIds', 'prepared', 'action'];
  dataSource: MatTableDataSource<billing>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<SoaListComponent>,
    private dialog: MatDialog,
    private AS: AccountingService,
    private TS: TransactionService
  ) { }

  ngOnInit() {
    let bill: billing;
    let billing: billing[];
    this.AS.getBilling().subscribe(bills => {
      bills.forEach(data => {
        bill = {
          soaCode: data.soaCode,
          fromDate: data.fromDate,
          toDate: data.toDate,
          soaDate: data.soaDate,
          transIds: data.transIds,
          address: data.address,
          companyID: data.companyID,
          billID: data.billID,
          attention: data.attention,
          prepared: data.prepared,
          verified: data.verified,
          validated: data.validated,
          trans: [],
          personnel: undefined
        }
        this.AS.getPersonnel(data.prepared).subscribe(
          person => {
            bill.personnel = person[0];
            let ids = data.transIds.split(",");
            ids.forEach((id, i) => {
              this.TS.getOneTrans("getTransaction/" + id).subscribe(
                transact => bill.trans.push(transact[0])
              )
              if (i + 1 == ids.length) {

              }
            });
          }
        )


      });
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
    let name: string;

  }

}
