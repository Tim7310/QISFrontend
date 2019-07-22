import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { user } from 'src/app/services/service.interface';
import { UserService } from 'src/app/services/user.service';
import { UserAccessComponent } from '../user-access/user-access.component';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() url: string;
  @Input() title: string;
  displayedColumns: string[] = ['userID', 'userName', 'userEmail', '_class', 'action'];
  dataSource: MatTableDataSource<user>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private user: UserService,
    private _snackBar: MatSnackBar
  ) {
    
  }

  ngOnInit() {
    this.getData();  
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

  verify(userID: number){
    const dialogRef = this.dialog.open(UserAccessComponent, {
      data: userID
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.status == "ok"){ 
        this.user.updateUserStatus(userID, "Y").subscribe(
          stat => {
            if(stat == 1){
              this.openSnackBar(result.message, result.status);
              this.getData();
            }else{
              this.openSnackBar("Error acquired on updating user Information", "error");
            }
          }
        )        
      }
    })
  }

  getData(){
    this.user.verifyUsers(this.url).subscribe(user => {
      this.dataSource = new MatTableDataSource(user);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
