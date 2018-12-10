import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http:HttpClient, private _userService: UserService, private _notifierService: NotifierService) { }

  getGames() {
    return this.http.get('http://127.0.0.1:5000/api/games');
  }

  addGame(game) {
    return this.http.post('http://127.0.0.1:5000/api/games', game);
  }

  removeGame(game) {
    return this.http.delete('http://127.0.0.1:5000/api/games/' + game);
  }
}
