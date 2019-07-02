import { Component, OnInit, ViewChild } from '@angular/core';
import { itemList } from 'src/app/services/service.interface';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { ItemService } from 'src/app/services/item.service';
import { CreateItemComponent } from '../create-item/create-item.component';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  displayedColumns: string[] = ['itemId', 'itemName', 'itemType', 'itemPrice', 'action'];
  dataSource: MatTableDataSource<itemList>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private IS: ItemService,
    private _snackBar: MatSnackBar
  ) {
    
  }

  ngOnInit() {
    this.IS.getItem("AllItems").subscribe(item => {
      this.dataSource = new MatTableDataSource(item);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
   
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  addItem(){
    const dialogRef = this.dialog.open(CreateItemComponent, {
      data: "undefined" 
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.status){
        this.openSnackBar(result.message, result.status);
        this.IS.getItem("AllItems").subscribe(item => {
          this.dataSource = new MatTableDataSource(item);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
    })
  }

  updateItem(id: number){
    const dialogRef = this.dialog.open(CreateItemComponent, {
      data:  id
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.status){
        this.openSnackBar(result.message, result.status);
        this.IS.getItem("AllItems").subscribe(item => {
          this.dataSource = new MatTableDataSource(item);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
    })
  }
}

/** Builds and returns a new User. */
