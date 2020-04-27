import { AuthService } from './Services/Auth.service';
import { OrderItemsService } from './Services/order-items.service';
import { ProductsService } from './Services/products-service.service';
import { ServerService} from './Services/server.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CartComponent } from './customer/cart/cart.component'
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ProductsComponent,
    LoginComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AdminModule,
    CustomerModule,
    FontAwesomeModule,
    ToastyModule.forRoot()
  ],
  providers: [
    AuthService,
    ProductsService,
    OrderItemsService,
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
