import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-popup',
  templateUrl: './admin-popup.component.html',
  styleUrls: ['./admin-popup.component.css']
})
export class AdminPopupComponent implements OnInit {

  fg: FormGroup;
  status: string;
  reason: boolean = false;

  constructor(public dialogRef: MatDialogRef<AdminPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) { }

  ngOnInit(): void {
    this.status =  this.data && this.data.ActiveDeActive === 'Active' ? '1' : '2';
    this.reason = this.status === '2' ? true : false;
    this.fg = new FormGroup(
      {
        "userName": new FormControl(this.data?.username || null, Validators.required),
        "employeeNo": new FormControl(this.data?.employeeNo || null, Validators.required),
        "mobileNumber": new FormControl(this.data?.phone || null, Validators.required),
        "status": new FormControl(this.data?.ActiveDeActive || null, Validators.required),
        "reason": new FormControl(this.data?.reason || null, Validators.required),
        "emailId": new FormControl(this.data?.emailId || null, Validators.required),
        "department": new FormControl(this.data?.dept || null, Validators.required),
        "designation": new FormControl(this.data?.designation || null, Validators.required)
      }
    )
  }

  showReason(event) {
    this.reason = event.target.value === '1' ? false : true;
  }

  saveUser() {
    this.userService.createUser({ ProcessVariables: this.fg.value }).subscribe(
      res => {
        this.dialogRef.close();
      }
    );
  }

  cancelUser() {
    this.dialogRef.close();
  }
}
