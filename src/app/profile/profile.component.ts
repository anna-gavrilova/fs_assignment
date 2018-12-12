import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { UserGameComponent } from 'src/app/_modals/user-game/user-game.component'
import { UserGame } from '../_models/user-game';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  displayedColumns: string[] = ["name", "gamertag", "score", "time_played", "last_played"];
  dataSource: MatTableDataSource<UserGame>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private form: FormGroup;
  private params: Params;
  private iUser: User;

  constructor(private _userService: UserService, private dialog: MatDialog, private fb: FormBuilder, private _notifierService: NotifierService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

      if (params && params.id) {
        this.iUser = this._userService.user;
        this.params = params;
        this._userService.getUser(params.id).subscribe(user => {
          if (!user['success']) {
            this.router.navigate(['/']);
            return;
          }
          this.iUser = user['docs'];
        });
      } else {
        this.displayedColumns.push("actions");
        this.iUser = this._userService.user;
      }
      this.setTable(this.iUser.games);
    })
    this.form = this.fb.group({
      file: [null, Validators.required]
    })
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
        this._userService.nextUser.next(res);
        this.setTable(this._userService.user.games);
      }
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const formData: FormData = new FormData();
      formData.append('userPhoto', file);
      this._userService.changeAvatar(formData).subscribe(res => {
        if (res['success']) {
          this._notifierService.notify('success', res['message']);
          this._userService.nextUser.next(<User>res['docs']);
        }
      });
    }
  }

  removeGame(game) {
    this._userService.removeGame({game: game}).subscribe(res => {
      if (res['success']) {
        this._notifierService.notify('success', res['message']);
        let games = this.dataSource.data;
        games = games.filter(iGame => {
          return String(iGame['_id']) != String(game);
        });
        this._userService.user.games = games;
        this._userService.nextUser.next(this._userService.user);
        this.setTable(this._userService.user.games);
      }
    })
  }

}
