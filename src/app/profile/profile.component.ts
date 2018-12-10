import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserGameComponent } from 'src/app/_modals/user-game/user-game.component'
import { UserGame } from '../_models/user-game';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  displayedColumns: string[] = ["gamertag", "score", "time_played", "last_played", "actions"];
  dataSource: MatTableDataSource<UserGame>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    console.log(this._userService.user);
    this.setTable(this._userService.user.games);
  }

  setTable(data) {
    this.dataSource = new MatTableDataSource<UserGame>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addGame() {
    const dialogRef = this.dialog.open(UserGameComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let users = this.dataSource.data;
        users.push(res);
        this.setTable(users);
      }
    });
  }

}
