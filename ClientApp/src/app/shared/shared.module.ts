import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ToastyModule } from 'ng2-toasty';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { NavMenuReducer } from '../Store/Reducers/nav-menu.reducers';
import { environment } from '../../environments/environment.prod';



@NgModule({
  declarations: [
    LoginComponent,
    NavMenuComponent,
    LogoutComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ToastyModule.forRoot(),
    RouterModule,
    StoreModule.forRoot({ navMenu: NavMenuReducer }),
    FontAwesomeModule,
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production
    })


  ],
  exports: [
    LoginComponent,
    NavMenuComponent,
    NotfoundComponent,
    ToastyModule,
    RouterModule
  ]
})
export class SharedModule { }
