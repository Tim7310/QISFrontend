import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { transaction, patient, itemList } from 'src/app/services/service.interface';
import { TransactionService } from 'src/app/services/transaction.service';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { ItemService } from 'src/app/services/item.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
export interface heldTable{
  id      : number,
  patient : patient,
  items   : string,
  date    : any
}
/** Constants used to fill up our data base. */
@Component({
  selector: 'held-transaction',
  templateUrl: './held-transaction.component.html',
  styleUrls: ['./held-transaction.component.scss']
})
export class HeldTransactionComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'items', 'date','action'];
  dataSource: MatTableDataSource<heldTable>;
  heldData: heldTable[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private TS    : TransactionService,
    private PS    : PatientService,
    private IS    : ItemService,
    public dialog : MatDialog,
    public dialogRef: MatDialogRef<HeldTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    
  }

  ngOnInit() {
    this.TS.getTransactions("getHeldTrans")
   .subscribe(
     data => {
      
      
      data.forEach(trans => {
        let transData : heldTable = {
          id      : trans.transactionId,
          patient : undefined,
          items   : "",
          date    : trans.transactionDate
        }
        this.PS.getOnePatient("getPatient/" + trans.patientId)
        .subscribe( pat => {
          transData.patient = pat[0];
        });
        this.TS.getTransExt(trans.transactionId)
        .subscribe(
          transExt => {
            transExt.forEach(ext => {
              if(ext.packageName != null){
                this.IS.getPack("getPackageName/" + ext.packageName)
                .subscribe(
                  pack => {
                    // let packItem : itemList = {
                    //   itemId          : pack[0].packageName,
                    //   itemName        : pack[0].packageName,
                    //   itemPrice       : pack[0].packagePrice,
                    //   itemDescription : pack[0].packageDescription,
                    //   itemType        : pack[0].packageType,
                    //   deletedItem     : pack[0].deletedPackage,
                    //   neededTest      : undefined,
                    //   creationDate    : pack[0].creationDate,
                    //   dateUpdate      : pack[0].dateUpdate,
                    // }
                    // transData.items.push(packItem);
                    // console.log(packItem);
                    if(transData.items != ""){
                      transData.items += " ,";
                    }
                    transData.items += pack[0].packageName;
                    
                    
                  }
                )
              }else if(ext.itemID){
                  this.IS.getItemByID(ext.itemID)
                  .subscribe( item => {
                    if(transData.items != ""){
                      transData.items += " ,";
                    }
                    // transData.items.push(item[0]);
                    transData.items += item[0].itemName;
                    
                  });
              }
            });
          }
        )
        this.heldData.push(transData);
      });
      this.dataSource = new MatTableDataSource(this.heldData);
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

  delete(value){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: {
        Title: "DELETE transaction ?", 
        Content: "Held transaction will be deleted in database."
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result == "ok"){
          let filt = this.heldData.filter(data => data.id === value);
          this.heldData.splice( this.heldData.indexOf(filt[0]), 1 ); 
          this.dataSource = new MatTableDataSource(this.heldData);
        }else{
          // do nothing
        }
      }
    )
    
  }
}
