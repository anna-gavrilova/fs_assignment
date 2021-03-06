import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { GameService } from 'src/app/_services/game.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  private form: FormGroup;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddGameComponent>,
    private fb: FormBuilder,
    private _gameService: GameService,
    private _notifierService: NotifierService
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      developer: ['', Validators.required],
      genre: ['', Validators.required],
      release: ['', Validators.required]
    });
  }

  addGame() {
    if (this.form.valid && !this.form.pristine) {
      this._gameService.addGame(this.form.getRawValue()).subscribe(res => {
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
