import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { transaction, patient, itemList, heldTable } from 'src/app/services/service.interface';
import { TransactionService } from 'src/app/services/transaction.service';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { ItemService } from 'src/app/services/item.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MathService } from 'src/app/services/math.service';
import { EditHMOComponent } from '../edit-hmo/edit-hmo.component';
import { MatSnackBar } from '@angular/material';
import { PaymentComponent } from 'src/app/admin/element/payment/payment.component';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { LaboratoryService } from 'src/app/services/laboratory.service';


/** Constants used to fill up our data base. */
@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TransactionListComponent implements OnInit {

  private snapshot: ActivatedRouteSnapshot;

  laboratory: any[] = [];

  displayedColumns: string[] = ['id', 'date', 'type', 'patient', 'biller', 'action'];
  dataSource: MatTableDataSource<heldTable>;
  heldData: heldTable[] = [];
  expandedElement: heldTable | null;

  @Input() listType: string;
  @Input() transType: string;
  @Output() addTrans = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showLoading: boolean = true;
  d = new DatePipe('en-US');
  months: Array<any> = [
    { value: "01", name: "January" },
    { value: "02", name: "February" },
    { value: "03", name: "March" },
    { value: "04", name: "April" },
    { value: "05", name: "May" },
    { value: "06", name: "June" },
    { value: "07", name: "July" },
    { value: "08", name: "August" },
    { value: "09", name: "September" },
    { value: "10", name: "October" },
    { value: "11", name: "November" },
    { value: "12", name: "December" }
  ]

  years: Array<any> = ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];

  monthVal: FormControl = new FormControl(this.d.transform(new Date(), "MM"));
  yearVal: FormControl = new FormControl(this.d.transform(new Date(), "yyyy"));
  // myFilter = (d: Date): boolean => {
  //   const day = d.getDay();
  //   return day !== 10;
  // }

  constructor(
    private TS: TransactionService,
    private PS: PatientService,
    private IS: ItemService,
    private math: MathService,
    private lab: LaboratoryService,
    public dialog: MatDialog,
    private router: Router,
    public state: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {

  }

  ngOnInit() {
    this.setData();
    if (!this.listType) {
      this.math.navSubs("cashier");
      this.listType = "transactions";
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setData() {
    this.showLoading = true;
    let url: any;
    if (this.transType == undefined) {
      url = "getTransactionDate/" +
        this.yearVal.value + "-" + this.monthVal.value + "-01/" +
        this.yearVal.value + "-" + this.monthVal.value + "-31";
    } else if (this.transType == "billing" || this.transType == "accounting") {
      url = "getTransBillingDate/" +
        this.yearVal.value + "-" + this.monthVal.value + "-01/" +
        this.yearVal.value + "-" + this.monthVal.value + "-31";
    }
    else {
      url = "getTransTypeDate/" + this.transType + "/" +
        this.yearVal.value + "-" + this.monthVal.value + "-01/" +
        this.yearVal.value + "-" + this.monthVal.value + "-31";
    }

    this.TS.getTransactions(url)
      .subscribe(
        data => {

          this.heldData = [];

          if (data.length > 0) {
            data.forEach(trans => {

              if (this.listType == "microscopy") {
                this.lab.getMicroscopy(trans.transactionId).subscribe(
                  micro => {
                    if (micro[0]) {
                      this.laboratory.push(micro[0]);
                    }
                  }
                )
              } else if (this.listType == "hematology") {
                this.lab.getHematology(trans.transactionId).subscribe(
                  hema => {
                    if (hema[0]) {
                      this.laboratory.push(hema[0]);
                    }
                  }
                )
              } else if (this.listType == "chemistry") {
                this.lab.getChemistry(trans.transactionId).subscribe(
                  chem => {
                    if (chem[0]) {
                      this.laboratory.push(chem[0]);
                    }
                  }
                )
              }

              let color = "black";
              if (trans.salesType == "refund") {
                color = "red";
              }

              let transData: heldTable = {
                id: trans.transactionId,
                patient: undefined,
                patInfo: undefined,
                items: [],
                type: trans.transactionType,
                date: trans.transactionDate,
                biller: trans.biller,
                action: "",
                color: color
              }
              this.PS.getOnePatient("getPatient/" + trans.patientId)
                .subscribe(pat => {
                  transData.patient = pat[0].fullName;
                  transData.patInfo = pat[0];
                });
              this.TS.getTransExt(trans.transactionId)
                .subscribe(
                  transExt => {
                    if (transExt.length > 0) {
                      transExt.forEach((ext, index) => {
                        if (ext.packageName != null) {
                          this.IS.getPack("getPackageName/" + ext.packageName)
                            .subscribe(
                              pack => {
                                let packItem: itemList = {
                                  itemId: pack[0].packageName,
                                  itemName: pack[0].packageName,
                                  itemPrice: pack[0].packagePrice,
                                  itemDescription: pack[0].packageDescription,
                                  itemType: pack[0].packageType,
                                  deletedItem: pack[0].deletedPackage,
                                  neededTest: undefined,
                                  creationDate: pack[0].creationDate,
                                  dateUpdate: pack[0].dateUpdate,
                                }
                                transData.items.push(packItem);
                              }
                            )
                        } else if (ext.itemID) {
                          this.IS.getItemByID(ext.itemID)
                            .subscribe(item => {
                              transData.items.push(item[0]);
                            });
                        }
                        if (transExt.length - 1 == index) {
                          this.showLoading = false;
                        }
                      });
                    }
                    else {
                      this.showLoading = false;
                    }
                  }
                )
              this.heldData.push(transData);
            });
            this.dataSource = new MatTableDataSource(this.heldData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.showLoading = false;
            this.dataSource = new MatTableDataSource([]);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      )

    if (this.listType == "transactions") {
      this.math.navSubs("cashier");
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  receipt(value) {
    const suffix = [value];
    this.math.printDocument('', suffix);

  }

  edit(value) {
    const dialogRef = this.dialog.open(EditHMOComponent, {
      data: value
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res.status) {
        this.openSnackBar(res.message, res.status);
      }
    })
  }

  getTrans(data: heldTable) {
    this.addTrans.emit(data);
  }

  payment(id) {
    let dial = this.dialog.open(PaymentComponent, {
      data: { id: id, type: 1 }
    })

    dial.afterClosed().subscribe(res => {
      if (res) {
        this.math.openSnackBar(res.message, res.status);
      }

    })
  }
  labNavigate(id) {
    this.snapshot = this.state.snapshot;
    this.router.navigate([this.snapshot.routeConfig.path + "/form", id]);
  }

  checkLab(id): boolean {
    let found = this.laboratory.find(lab => lab.transactionID === id);
    if (found) {
      return true;
    } else {
      return false;
    }
  }

  labRes(id, section) {
    const suffix = [id, section];
    this.math.printLab('', suffix);
  }
}
