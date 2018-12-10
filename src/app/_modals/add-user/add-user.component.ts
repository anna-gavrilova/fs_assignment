import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  private form: FormGroup;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private fb: FormBuilder,
    private _userService: UserService,
    private _notifierService: NotifierService
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nickname: ['', Validators.required],
      email: ['', Validators.required],
      pass: ['', Validators.required],
      role: [1, Validators.required]
    });
  }

  addUser() {
    if (this.form.valid && !this.form.pristine) {
      this._userService.addUser(this.form.getRawValue()).subscribe(res => {
        if (res['success']) {
          this._notifierService.notify('success', res['message']);
          this.dialogRef.close(res['docs']);
        } else {
          this._notifierService.notify('error', res['message']);
        }
      });
    } else {
      this._notifierService.notify('error', 'Please ensure all fields are filled out.');
    }
  }

}
