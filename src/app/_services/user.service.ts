import { Injectable } from '@angular/core';

import { HttpClient,HttpParams} from '@angular/common/http';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User = null;
  public nextUser = new ReplaySubject<User>(null);

  constructor(private http:HttpClient) {
    if (this.user === null) {
      this.nextUser.subscribe((user: User) => {
        this.user = user;
      });
    }
    if (this.user === null && localStorage.getItem('loggedUser')) {
      this.nextUser.next(<User>JSON.parse(localStorage.getItem('loggedUser')));
    }
  }

  getUsers(){
    return this.http.get('http://127.0.0.1:5000/api/users');
  }

  addUser(user) {
    return this.http.post('http://127.0.0.1:5000/api/users', user);
  }

  removeUser(user) {
    return this.http.delete('http://127.0.0.1:5000/api/users/' + user);
  }

  addGame(game) {
    console.log(game);
    return this.http.put('http://127.0.0.1:5000/api/users/newgame', game);
  }

}
