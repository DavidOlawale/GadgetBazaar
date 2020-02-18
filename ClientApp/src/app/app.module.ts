import { OrderItemsService } from './Services/order-items.service';
import { ProductsService } from './Services/products-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProductsDisplayComponent } from './products-display/products-display.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ProductsDisplayComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductFilterComponent,
    ProductDisplayComponent,
    CartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {path: 'products', component: ProductsDisplayComponent},
      { path: './detail/:id', component: ProductDetailsComponent  },
      { path: 'cart', component: CartComponent}
    ])
  ],
  providers: [
    ProductsService,
    OrderItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
