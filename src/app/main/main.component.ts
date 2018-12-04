import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../_models/user";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _uService:UserService,   private route: ActivatedRoute,
    private router: Router,public dialog: MatDialog) { 
  
  }
private users;

  ngOnInit() {
  }

}
