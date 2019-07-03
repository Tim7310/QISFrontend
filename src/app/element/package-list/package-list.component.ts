import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { packList } from 'src/app/services/service.interface';
import { ItemService } from 'src/app/services/item.service';
import { CreatePackageComponent } from '../create-package/create-package.component';

@Component({
  selector: 'package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {

  displayedColumns: string[] = 
  ['packageName', 'packageDescription','packageType', 'packagePrice', 'action'];
  dataSource: MatTableDataSource<packList>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private IS: ItemService,
    private _snackBar: MatSnackBar
  ) {
    
  }

  ngOnInit() {
    this.IS.getPackage("getPackage").subscribe(pack => {
      this.dataSource = new MatTableDataSource(pack);
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
    const dialogRef = this.dialog.open(CreatePackageComponent, {
      data: "undefined" 
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.status){
        this.openSnackBar(result.message, result.status);
        this.IS.getPackage("getPackage").subscribe(pack => {
          this.dataSource = new MatTableDataSource(pack);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
    })
  }

  updateItem(value){
    const dialogRef = this.dialog.open(CreatePackageComponent, {
      data:  value
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.status){
        this.openSnackBar(result.message, result.status);
        this.IS.getPackage("getPackage").subscribe(pack => {
          this.dataSource = new MatTableDataSource(pack);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
    })
  }
}
