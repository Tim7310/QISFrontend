import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {
  level = [
    { value: 0, name: "NO ACCESS" },
    { value: 1, name: "LEVEL 1" },
    { value: 2, name: "LEVEL 2" },
  ]
  access: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<UserAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any
  ) { }

  ngOnInit() {
    this.access = this.fb.group({
      privID: [undefined],
      qualityControl: [0],
      cashierAccount: [0], 
      doctor: [0],
      userID: [this.id],
      medical: [0],
      cashierCash: [0],
      laboratory: [0],
      imaging: [0],
      admin: [0]
    })
  }

}
