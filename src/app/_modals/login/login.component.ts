import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
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
    public dialogRef: MatDialogRef<LoginComponent>,
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
      console.log("meow");
      this._authService.getUserDetails(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe((data) => {
        console.log(data);
          if(data['docs']){
            localStorage.setItem('loggedUser', JSON.stringify(data['docs']));
            this._userService.nextUser.next(data['docs']);
            this.dialogRef.close();
            this._notifierService.notify('success', 'Welcome back ' + data['docs']['nickname'] + '!');
          }
          else
            this._notifierService.notify('error', 'Invalid login.')
        }
      );
    }
  }

}
