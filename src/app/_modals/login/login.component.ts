import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
//import * as hash from 'node_modules/hash.js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    { provide: MatDialogRef, useValue: {} },
	  { provide: MAT_DIALOG_DATA, useValue: [] }
  ]
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private fb: FormBuilder,
    private Auth: AuthService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new String(),
      password: new String()
    });
  }

  close() {
    this.dialogRef.close();
  }

  login(event) {
    let username=this.loginForm.value.email;
    let password=this.loginForm.value.password;
    //password=hash.sha256().update(password).digest('hex');
    this.Auth.getUserDetails(username,password);
  }

}
