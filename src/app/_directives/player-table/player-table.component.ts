import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserGame } from '../../_models/user-game';
import { User } from '../../_models/user';
import { Game } from '../../_models/game';
import {UserService} from '../../user.service';


/* Temp Data */
const GAMERTAGS: string[] = ["EffeKT", "Myoga", "TheRealEffeKT", "SmolSadBoy", "DudesAreUs", "Mggt"];
const GAMES: string[] = ["League of Legends", "Overwatch", "Stardew Valley", "Assassins Creed: Black Flag", "Diablo 3", "Diablo 2", "Starcraft 2"];




@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {

  displayedColumns: string[] = ["gamertag", "score", "time_played", "game"];
  dataSource: MatTableDataSource<UserGame>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _uService:UserService) {
    const users = Array.from({length: 100}, (_, k) => this.buildName());
    console.log(users);
    this.dataSource = new MatTableDataSource<any>();
    this.getUsers();
    console.log("from player-table.....");
   
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buildName(): UserGame {
    const game: Game = {
      name: GAMES[Math.round(Math.random() * (GAMES.length - 1))]
    }

    const theGame: UserGame = {
      game_id: game,
      score: Math.round(Math.random() * 5000000),
      gamertag: GAMERTAGS[Math.round(Math.random() * (GAMERTAGS.length - 1))],
      time_played: Math.round(Math.random() * 5000000)
    }

    console.log(theGame);

    return theGame;
  }

  getUsers(){
    let that=this;
    this._uService.getUsers().subscribe(data=>{
      console.log(data['docs']);
      this.dataSource=data['docs']
   });
   
  }
}


