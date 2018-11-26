import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  getUserDetails(uname,pass){
   return this.http.get('http://127.0.0.1:5000/api/users/meow',{
    }).subscribe(
      data=>{console.log("Mep")}
    );
  }
}
