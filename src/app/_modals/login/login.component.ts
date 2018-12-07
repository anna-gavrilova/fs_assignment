import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

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
    private _router: Router
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
          if(data['docs']){
            console.log("User logged in!");
            this._authService._loggedUser=data['docs'][0];
            localStorage.setItem('loggedUser', JSON.stringify(data['docs'][0]));
            this.dialogRef.close();
          }
          else
            console.error("User Not Found");
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
