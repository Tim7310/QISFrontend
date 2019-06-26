import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TransactionService } from 'src/app/services/transaction.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-edit-hmo',
  templateUrl: './edit-hmo.component.html',
  styleUrls: ['./edit-hmo.component.scss']
})
export class EditHMOComponent implements OnInit {
  transaction = new FormGroup({
    date : new FormControl(""),
    ac : new FormControl(""),
    an : new FormControl(""),
    loe : new FormControl("")
  }) 
  constructor(
    private TS : TransactionService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditHMOComponent>,
    @Inject(MAT_DIALOG_DATA) public trans: any
  ) { }

  ngOnInit() {
    
    this.TS.getOneTrans("getTransaction/" + this.trans)
    .subscribe(
      data => {
        this.transaction.get("date").setValue(data[0].transactionDate);
        this.transaction.get("ac").setValue(data[0].ac);
        this.transaction.get("an").setValue(data[0].an);
        this.transaction.get("loe").setValue(data[0].loe);        
      }
    )
  }

  update(){
    const ac = this.transaction.get("ac").value;
    const an = this.transaction.get("an").value;
    const loe = this.transaction.get("loe").value;
    const date = this.transaction.get("date").value;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: { Title: "Are you sure?", Content: "transaction " + this.trans + " will update" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == "ok"){ 
        this.TS.updateHMO(this.trans, ac, an, loe, date)
        .subscribe( res => {
          if(res == 1){
            this.dialogRef.close({
              message : "transaction " + this.trans + " updated Successfully",
              status  : "ok"
            })
          }else{
            this.dialogRef.close({
              message : "Error in updating " + this.trans + " transaction!!!",
              status  : "error"
            })
          }      
        },
          (error: any) =>{
            console.error(error);      
          }
        )
      }
    });
    
  }
}
