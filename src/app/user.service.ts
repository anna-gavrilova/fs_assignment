import { Injectable } from '@angular/core';

import { HttpClient,HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  getUsers(){
    return this.http.get('http://127.0.0.1:5000/api/users');
  }

}
