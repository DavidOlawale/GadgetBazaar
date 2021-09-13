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
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';


@NgModule({
  declarations: [
    LoginComponent,
    NavMenuComponent,
    LogoutComponent,
    NotfoundComponent,
    SignUpComponent,
    AdminLayoutComponent,
    CustomerLayoutComponent
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
    AdminLayoutComponent,
    CustomerLayoutComponent,
    ToastyModule
  ]
})
export class SharedModule { }
