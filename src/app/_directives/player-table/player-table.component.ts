import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserGame } from '../../_models/user-game';
import { User } from '../../_models/user';
import { Game } from '../../_models/game';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {

  displayedColumns: string[] = ["nickname", "gamertag", "score", "time_played", "game"];
  dataSource: MatTableDataSource<UserGame>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _uService:UserService) {
    this.dataSource = new MatTableDataSource<any>();
    this.getUsers();
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

  getUsers(){
    let that=this;
    this._uService.getUsers().subscribe(data=>{
      console.log(data['docs']);
      this.dataSource=data['docs']
   });
   
  }
}


