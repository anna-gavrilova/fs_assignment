import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AddUserComponent } from 'src/app/_modals/add-user/add-user.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  displayedColumns: string[] = ["email", "nickname", "role", "actions"];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private _userService: UserService, private _notifierService: NotifierService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<User>();
    this._userService.getUsers().subscribe((res) => {
      this.setTable(res['docs']);
    });
  }

  setTable(data) {
    this.dataSource = new MatTableDataSource<User>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
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

  removeUser(user) {
    this._userService.removeUser(user).subscribe(res => {
      if (res['success']) {
        this._notifierService.notify('success', res['message']);
        let users = this.dataSource.data;
        let ind = users.findIndex(iuser => iuser._id == user);
        users.splice(ind, 1);
        this.setTable(users);
      }
      else
        this._notifierService.notify('error', res['message']);
    });
  }

}
