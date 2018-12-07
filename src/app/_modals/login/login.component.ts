import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private _notifierService: NotifierService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  login() {
    let user;
    if (this.loginForm.valid) {
      this._authService.getUserDetails(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe((data) => {
          if(data['docs'].length){
            localStorage.setItem('loggedUser', JSON.stringify(data['docs'][0]));
            this._userService.nextUser.next(data['docs'][0]);
            this.dialogRef.close();
            this._notifierService.notify('success', 'Welcome back ' + data['docs'][0]['nickname'] + '!');
          }
          else
            this._notifierService.notify('error', 'Invalid login.')
        }
      );
      // console.log(user);
      // if (user) {
        
      // } else {
      //   console.log(user);
      // }
    }
  }

}
