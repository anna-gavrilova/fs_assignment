import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MainComponent} from './main/main.component';
import { LoginComponent} from './_modals/login/login.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
