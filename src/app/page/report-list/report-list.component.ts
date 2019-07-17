import { Component, OnInit, ViewChild } from '@angular/core';
import { patient, itemList, transaction } from 'src/app/services/service.interface';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { ItemService } from 'src/app/services/item.service';
import { PatientService } from 'src/app/services/patient.service';
import { MathService } from 'src/app/services/math.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { UserService } from 'src/app/services/user.service';
export interface trans_items{
  itemName        : string,
  itemPrice       : number,
  itemDescription : string,
  qty             : number,
  subtotal        : any,
  disc            : number
}
export interface heldTable{
  id      : number,
  trans   : transaction,
  patInfo : patient,
  patient : string,
  items   : trans_items[],
  date    : any,
  type    : string,
  biller  : string,
  action  : any,
  cashier : any,
  color   : string
}
export interface Generate{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReportListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'type', 'patient', 'biller', "cashier"];
  dataSource: MatTableDataSource<heldTable>;
  heldData: heldTable[] = [];
  expandedElement: heldTable | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  showLoading: boolean = true;
  d = new DatePipe('en-US');

  gen: Generate[] = [
    {value: "sr", viewValue: 'Sales Report'},
    {value: 'csv', viewValue: 'Generate CSV'}
    // {value: 'eotd', viewValue: 'End Of The Day'},
    // {value: 'fpf', viewValue: 'For PF'},
    // {value: 'fb', viewValue: 'For Billing'},
    // {value: 'tr', viewValue: 'Today\'s Report'}
  ];

  from : FormControl = new FormControl(this.d.transform(new Date(),"yyyy-MM-dd 06:00:00"));
  to : FormControl = new FormControl(this.d.transform(new Date(),"yyyy-MM-dd 20:00:00"));
  generateFile: FormControl = new FormControl("", [Validators.required]);
  // myFilter = (d: Date): boolean => {
  //   const day = d.getDay();
  //   return day !== 10;
  // }

  constructor(
    private TS    : TransactionService,
    private PS    : PatientService,
    private IS    : ItemService,
    private math  : MathService,
    public dialog : MatDialog,
    private _snackBar : MatSnackBar,
    private user : UserService
    ) {
      this.math.navSubs("cashier");
  }

  ngOnInit() {
    this.setData(false);    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setData(foo: boolean = true){
    this.showLoading = true;
    if(foo === true){
      let from = new Date(this.from.value);
      this.from.setValue(this.d.transform(from ,"yyyy-MM-dd HH:mm:ss"));
      let to = new Date(this.to.value);
      this.to.setValue(this.d.transform(to ,"yyyy-MM-dd HH:mm:ss"));

      console.log(this.to.value);
      
    }
    const url = "getTransactionDate/" + this.from.value + "/" + this.to.value;
    
    this.TS.getTransactions(url)
   .subscribe(
     data => {
      
      this.heldData = [];

      if(data.length > 0){
      data.forEach(trans => {
        let color = "black";
        if(trans.salesType == "refund"){
          color = "red";
        }
        let transData : heldTable = {
          id      : trans.transactionId,
          trans   : trans,
          patient : undefined,
          patInfo : undefined,
          items   : [],
          type    : trans.transactionType,
          date    : trans.transactionDate,
          biller  : trans.biller,
          action  : "",
          cashier : "",
          color   : color
        }
        this.user.getUser(trans.userId)
        .subscribe(user => {
          transData.cashier = user[0].userName;
        })
        this.PS.getOnePatient("getPatient/" + trans.patientId)
        .subscribe( pat => {
          transData.patient = pat[0].fullName;
          transData.patInfo = pat[0];
        });
        this.TS.getTransExt(trans.transactionId)
        .subscribe(
          transExt => {
            if(transExt.length > 0){
              transExt.forEach((ext, index) => {
              if(ext.packageName != null){
                this.IS.getPack("getPackageName/" + ext.packageName)
                .subscribe(
                  pack => {
                    let packItem : trans_items = {
                      itemName        : pack[0].packageName,
                      itemPrice       : pack[0].packagePrice,
                      itemDescription : pack[0].packageDescription,
                      qty             : ext.itemQTY,
                      disc            : ext.itemDisc,
                      subtotal        : ""
                    }
                    packItem.subtotal = this.math.computeDisc(
                        pack[0]. packagePrice, ext.itemDisc, ext.itemQTY
                      );
                    transData.items.push(packItem); 
                  }
                )
              }else if(ext.itemID){
                  this.IS.getItemByID(ext.itemID)
                  .subscribe( item => {
                    let Item : trans_items = {
                      itemName        : item[0].itemName,
                      itemPrice       : item[0].itemPrice,
                      itemDescription : item[0].itemDescription,
                      qty             : ext.itemQTY,
                      disc            : ext.itemDisc,
                      subtotal        : ""
                    }
                    Item.subtotal = this.math.computeDisc(
                        item[0].itemPrice, ext.itemDisc, ext.itemQTY
                      );
                    transData.items.push(Item);                    
                  });
              }
              if(transExt.length - 1 == index ){
                 this.showLoading = false;
              }
            });
            }
            else{
              this.showLoading = false;
            }
          }
        )
        this.heldData.push(transData);
      });
      this.dataSource = new MatTableDataSource(this.heldData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }else{
        this.showLoading = false;
        this.dataSource = new MatTableDataSource([]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      }
   ) 
   
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  genCSV(){
    let data: Array<any> = [];
    let cashTotal = 0; let dollarTotal = 0; let accountTotal = 0; 
    let creditTotal = 0; let onlineTotal = 0;
    let cash    : Array<any> = [
      {date: "CASH", id: "", transType: "", patName: "", comName: "", items: "", qty: "", 
      subTotal: "", total: "", biller: "", cashier: "", tendered: "", change: ""}]; 
    let account : Array<any> = [
      {date: "ACCOUNT", id: "", transType: "", patName: "", comName: "", items: "", qty: "", 
      subTotal: "", total: "", biller: "", cashier: "", tendered: "", change: ""}
    ];
    let dollar  : Array<any> = [
      {date: "DOLLAR", id: "", transType: "", patName: "", comName: "", items: "", qty: "", 
      subTotal: "", total: "", biller: "", cashier: "", tendered: "", change: ""}
    ];
    let credit  : Array<any> = [
      {date: "CREDIT", id: "", transType: "", patName: "", comName: "", items: "", qty: "", 
      subTotal: "", total: "", biller: "", cashier: "", tendered: "", change: ""}
    ];
    let online  : Array<any> = [
      {date: "ONLINE", id: "", transType: "", patName: "", comName: "", items: "", qty: "", 
      subTotal: "", total: "", biller: "", cashier: "", tendered: "", change: ""}
    ];

   this.heldData.forEach(trans => {
     let transArr: Array<any> = [{date: trans.date, id: trans.id, transType: trans.type, patName: trans.patient, 
      comName: trans.patInfo.companyName, items: "", qty: "", subTotal: "", 
      total: trans.trans.grandTotal, biller: trans.biller, cashier: trans.cashier, 
      tendered: trans.trans.paidIn, change: trans.trans.paidOut}]
      trans.items.forEach(item => {
        transArr.push({date: "", id: "", transType: "", patName: "", comName: "", 
        items: item.itemName, qty: item.qty, subTotal: item.subtotal, 
        total: "", biller: "", cashier: "", tendered: "", change: ""})
      });
     
      if(trans.trans.transactionType == "CASH"){
// USD dollar transaction 
        if(trans.trans.currency == "USD"){
          dollar = dollar.concat(transArr);
          dollarTotal += trans.trans.grandTotal;
        } else if(trans.trans.currency == "PESO"){
// CASH or walkin transaction 
          cash = cash.concat(transArr);       
          cashTotal += trans.trans.grandTotal;
        }

      }else if(trans.trans.transactionType == "ACCOUNT" 
      || trans.trans.transactionType == "APE" 
      || trans.trans.transactionType == "HMO"){
          account = account.concat(transArr);       
          accountTotal += trans.trans.grandTotal;
      }else if(trans.trans.transactionType == "CREDIT"){
        
      }else if(trans.trans.transactionType == "ONLINE"){
        
      }
      
    }
    );
    cash.push({date: "", id: "", transType: "", patName: "", comName: "", items: "", qty: "", 
    subTotal: "Cash Total", total: cashTotal, biller: "", cashier: "", tendered: "", change: ""});

    dollar.push({date: "", id: "", transType: "", patName: "", comName: "", items: "", qty: "", 
    subTotal: "USD Total", total: dollarTotal, biller: "", cashier: "", tendered: "", change: ""});

    account.push({date: "", id: "", transType: "", patName: "", comName: "", items: "", qty: "", 
    subTotal: "Account Total", total: accountTotal, biller: "", cashier: "", tendered: "", change: ""});

    data = cash.concat( dollar, account);
    
    new Angular5Csv(data, 'My Report', {
      headers: [
        "Date and Time", "Receipt No.", "Transaction Type", "Patient Name", 
        "Company Name", "Items", "QTY", "Subtotal", "Total", "Bill To", "Cashier",
        "Amount Tendered", "Given Change"
      ]
    });   
    
  }

  generate(){
    console.log(this.generateFile.value);
    if(this.generateFile.value == "csv"){
      this.genCSV();
    }
    else if(this.generateFile.value == "sr"){
      let from = new Date(this.from.value);
      this.from.setValue(this.d.transform(from ,"yyyy-MM-dd HH:mm:ss"));
      let to = new Date(this.to.value);
      this.to.setValue(this.d.transform(to ,"yyyy-MM-dd HH:mm:ss"));
      const suffix = [this.from.value, this.to.value];

      this.math.printReport('', suffix);
    }
  }
}
