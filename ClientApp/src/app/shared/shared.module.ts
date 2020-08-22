import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ToastyModule } from 'ng2-toasty';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  declarations: [
    LoginComponent,
    NavMenuComponent,
    LogoutComponent,
    NotfoundComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ToastyModule.forRoot(),
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    NavMenuComponent,
    LogoutComponent,
    NotfoundComponent,
    SignUpComponent,
    ToastyModule
  ]
})
export class SharedModule { }
