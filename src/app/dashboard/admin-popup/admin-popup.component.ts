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
    this.status =  this.data && this.data.isActive === '1' ? '1' : '2';
    this.reason = this.status === '2' ? true : false;
    this.fg = new FormGroup(
      {
        "userName": new FormControl(this.data?.name || null, Validators.required),
        "employeeNo": new FormControl(this.data?.employeeNumber || null),
        "mobileNumber": new FormControl(this.data?.phoneNo || null, Validators.required),
        "status": new FormControl(this.data?.isActive || null, Validators.required),
        "reason": new FormControl(this.data?.reason || null),
        "emailId": new FormControl(this.data?.emailId || null),
        "department": new FormControl(this.data?.department || null, Validators.required),
        "designation": new FormControl(this.data?.designation || null, Validators.required)
      }
    )
  }

  showReason(event) {
    this.reason = event.target.value === '1' ? false : true;
  }

  saveUser(data) {
    if (data) {
      let payload = {
        ProcessVariables: {
        "userName":this.f.userName.value,
        "department":this.f.department.value,
        "phoneNo":this.f.mobileNumber.value,
        "designation":this.f.designation.value,
        "activeStatus":this.reason ? '0':'1',
        "reason":this.f.reason.value ? this.f.reason.value : '',
        "emailId":this.f.emailId.value
      }
      }
      this.userService.updateUser(payload).subscribe(res=> {
        this.dialogRef.close();
      })

    } else {
      this.userService.createUser({ ProcessVariables: this.fg.value }).subscribe(
      res => {
        this.dialogRef.close();
      }
    );
    }
    
  }

  get f() { return this.fg.controls; }

  cancelUser() {
    this.dialogRef.close();
  }
}
