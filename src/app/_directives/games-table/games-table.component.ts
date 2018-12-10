import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Game } from 'src/app/_models/game';
import { GameService } from 'src/app/_services/game.service';
import { UserService } from 'src/app/_services/user.service';
import { AddGameComponent } from 'src/app/_modals/add-game/add-game.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-games-table',
  templateUrl: './games-table.component.html',
  styleUrls: ['./games-table.component.css']
})
export class GamesTableComponent implements OnInit {

  displayedColumns: string[] = ["name", "developer", "genre", "release_date", "actions"];
  dataSource: MatTableDataSource<Game>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private _gameService: GameService, private _userService: UserService, private _notifierService: NotifierService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Game>();
    this._gameService.getGames().subscribe((res) => {
      this.setTable(res['docs']);
    });
  }

  setTable(data) {
    this.dataSource = new MatTableDataSource<Game>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addGame() {
    const dialogRef = this.dialog.open(AddGameComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(res => {
      let games = this.dataSource.data;
      games.push(res);
      this.setTable(games);
    });
  }

  removeGame(game) {
    this._gameService.removeGame(game).subscribe(res => {
      if (res['success']) {
        this._notifierService.notify('success', res['message']);
        let games = this.dataSource.data;
        let ind = games.findIndex(igame => igame._id == game);
        games.splice(ind, 1);
        this.setTable(games);
      }
      else
        this._notifierService.notify('error', res['message']);
    });
  }

}
