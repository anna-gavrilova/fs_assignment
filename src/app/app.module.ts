import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule, MatButtonModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './_modals/login/login.component';
import { PlayerTableComponent } from './_directives/player-table/player-table.component';
import 'hammerjs';

import { AuthService } from './_services/auth.service';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';

import { NotifierModule, NotifierService } from 'angular-notifier';
import { AdminComponent } from './admin/admin.component';
import { GamesTableComponent } from './_directives/games-table/games-table.component';
import { AddGameComponent } from './_modals/add-game/add-game.component';
import { GamesComponent } from './games/games.component';
import { UsersTableComponent } from './_directives/users-table/users-table.component';
import { AddUserComponent } from './_modals/add-user/add-user.component';
import { UserGameComponent } from './_modals/user-game/user-game.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'profile', canActivate: [AuthGuard], children: [
    { path: '', component: ProfileComponent },
    { path: ':id', component: ProfileComponent }
  ]},
  { path: 'admin', canActivate: [AdminGuard], children: [
    { path: '', component: AdminComponent }
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    PlayerTableComponent,
    ProfileComponent,
    AdminComponent,
    GamesTableComponent,
    AddGameComponent,
    GamesComponent,
    UsersTableComponent,
    AddUserComponent,
    UserGameComponent
  ],
  entryComponents: [
    LoginComponent,
    AddGameComponent,
    AddUserComponent,
    UserGameComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    NotifierService,
    MatIconRegistry,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
