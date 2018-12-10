import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { GameService } from 'src/app/_services/game.service';
import { UserService } from 'src/app/_services/user.service';
import { Game } from 'src/app/_models/game';

@Component({
  selector: 'app-user-game',
  templateUrl: './user-game.component.html',
  styleUrls: ['./user-game.component.css']
})
export class UserGameComponent implements OnInit {

  private form: FormGroup;
  private games: Game;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserGameComponent>,
    private fb: FormBuilder,
    private _gameService: GameService,
    private _userService: UserService,
    private _notifierService: NotifierService
    ) { }

  ngOnInit() {
    this._gameService.getGames().subscribe(res => {
      this.games = res['docs'];
    });

    this.form = this.fb.group({
      game: ['', Validators.required],
      gamertag: ['', Validators.required]
    });
  }

  addGame() {
    if (this.form.valid && !this.form.pristine) {
      this._userService.addGame(this.form.getRawValue()).subscribe(res => {
        if (res['success']) {
          this._notifierService.notify('success', res['message']);
          this.dialogRef.close(res['docs']);
        } else {
          this._notifierService.notify('error', res['message']);
        }
      });
    } else {
      this._notifierService.notify('error', 'Please ensure all fields are filled out.');
    }
  }

}
