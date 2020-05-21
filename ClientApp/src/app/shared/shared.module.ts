import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from '../Services/Auth.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { ToastyModule } from 'ng2-toasty';



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
    ToastyModule.forRoot()
  ],
  exports: [
    LoginComponent,
    NavMenuComponent,
    NotfoundComponent,
    ToastyModule
  ]
})
export class SharedModule { }
