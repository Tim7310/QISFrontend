import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from 'src/app/services/transaction.service';

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
    public dialogRef: MatDialogRef<EditHMOComponent>,
    @Inject(MAT_DIALOG_DATA) public trans: any
  ) { }

  ngOnInit() {
    console.log(this.trans);
    
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

  }

}
