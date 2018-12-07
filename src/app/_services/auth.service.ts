import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import { User } from '../_models/user';
import { Subject } from 'rxjs';
import {UserService} from "./user.service";
//TODO: replace the base url with util.baseurl
//TODO: handle the user not found error somehow

@Injectable()
export class AuthService {

  //private _userLogged$=new Subject<any>();
  public _loggedUser:User=null;
  constructor(private http:HttpClient) {

   }

//log in
  getUserDetails(uname,pass){
    let body = new HttpParams();
    body = body.set('username', uname);
    body = body.set('password', pass);
    return this.http.post('http://127.0.0.1:5000/api/login',body);
  }

  //TODO:logout
    logout(){
      this._loggedUser=null;
    }
}
