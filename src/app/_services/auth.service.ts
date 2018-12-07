import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import {UserService} from "./user.service";
import { NotifierService } from 'angular-notifier';

@Injectable()
export class AuthService {

  constructor(private http:HttpClient, private _userService: UserService, private _router: Router, private _notifierService: NotifierService) {}

//log in
  getUserDetails(uname,pass){
    let body = new HttpParams();
    body = body.set('username', uname);
    body = body.set('password', pass);
    return this.http.post('http://127.0.0.1:5000/api/login',body);
  }

  logout(){
    localStorage.removeItem('loggedUser');
    this._userService.nextUser.next(null);
    this._router.navigate(['/']);
    this._notifierService.notify('error', 'You have logged out.');
  }
}
