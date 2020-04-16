import { AuthService } from './Services/Auth.service';
import { OrderItemsService } from './Services/order-items.service';
import { ProductsService } from './Services/products-service.service';
import { ServerService} from './Services/server.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CartComponent } from './customer/cart/cart.component'
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './customer/product-details/product-details.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { LoginComponent } from './login/login.component';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ProductsComponent,
    ProductFilterComponent,
    ProductDisplayComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'details/:id', component: ProductDetailsComponent  },
      { path: 'cart', component: CartComponent },
      { path: 'login', component: LoginComponent }
    ]),
    AdminModule,
    CustomerModule
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
