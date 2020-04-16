import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { AlterInCartComponent } from './alter-in-cart/alter-in-cart.component';
import { CustomerProductsComponent } from './customer-products/customer-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDisplayComponent} from './product-display/product-display.component'
import {ProductFilterComponent } from './product-filter/product-filter.component'


@NgModule({
  declarations: [
    AlterInCartComponent,
    CartComponent,
    CustomerProductsComponent,
    ProductDetailsComponent,
    ProductDisplayComponent,
    ProductFilterComponent,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlterInCartComponent,
    CartComponent,
    CustomerProductsComponent,
    ProductDetailsComponent,
    ProductDisplayComponent,
    ProductFilterComponent
  ],
  providers: [
    
  ]
})
export class CustomerModule { }
