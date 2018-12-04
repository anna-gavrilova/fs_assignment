import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import { User } from './_models/user';
import { Subject } from 'rxjs';
import {UserService} from "./services/user.service";
//TODO: replace the base url with util.baseurl
//TODO: handle the user not found error somehow

@Injectable({
  providedIn: 'root'
})
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
   return this.http.post('http://127.0.0.1:5000/api/login',body).subscribe(
          data=>{
            if(data['docs']){
            console.log("User logged in!");
            this._loggedUser=data['docs'][0];
            console.log(data);
            }
            else
            console.error("User Not Found");
            
          }
      
    );
  }

  //TODO:logout
    logout(){
      this._loggedUser=null;
    }
}
