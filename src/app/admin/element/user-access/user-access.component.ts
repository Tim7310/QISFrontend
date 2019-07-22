import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ConfirmComponent } from 'src/app/element/confirm/confirm.component';
import { user } from 'src/app/services/service.interface';

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
  userValue: user;

  constructor(
    private user: UserService,
    public fb: FormBuilder,
    public dialog: MatDialog,
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

    this.user.getUser(this.id).subscribe(
      user => {
        this.userValue = user[0];
      }
    );

    this.user.getUserPriv(this.id).subscribe(
      priv => {
        if (priv[0]) {
          this.access.controls.qualityControl.setValue(priv[0].qualityControl);
          this.access.controls.cashierAccount.setValue(priv[0].cashierAccount);
          this.access.controls.doctor.setValue(priv[0].doctor);
          this.access.controls.medical.setValue(priv[0].medical);
          this.access.controls.cashierCash.setValue(priv[0].cashierCash);
          this.access.controls.laboratory.setValue(priv[0].laboratory);
          this.access.controls.imaging.setValue(priv[0].imaging);
          this.access.controls.admin.setValue(priv[0].admin);
          this.access.controls.privID.setValue(priv[0].privID);
        }
      }
    )
  }

  addPriv() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: {
        Title: "Are you sure?",
        Content: "Are you want to add access to " + this.userValue.userName
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "ok") {
        this.user.getUserPriv(this.id).subscribe(
          priv => {
            if (priv[0]) {
              this.user.updateUserPriv(this.access.value).subscribe(
                foo => {
                  if (foo == 1) {
                    this.dialogRef.close({
                      message : "User access successfully updated.",
                      status  : "ok", 
                    });
                  }else{
                    this.dialogRef.close({
                      message : "Error acquired on updating user access!!!",
                      status  : "error", 
                    });
                  }
                }
              )
            } else {
              this.user.addUserPriv(this.access.value).subscribe(
                foo => {
                  if (foo == 1) {
                    this.dialogRef.close({
                      message : "User access successfully added.",
                      status  : "ok", 
                    });
                  }else{
                    this.dialogRef.close({
                      message : "Error acquired on adding access to user!!!",
                      status  : "error", 
                    });
                  }
                }
              )
            }
          }
        )
      }
    })

  }

}
