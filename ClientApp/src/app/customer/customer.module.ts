import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { AlterInCartComponent } from './alter-in-cart/alter-in-cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component'


@NgModule({
  declarations: [
    CartComponent,
    AlterInCartComponent,
    ProductDetailsComponent

  ],
  imports: [
    CommonModule
  ],
  exports: [
    CartComponent,
    AlterInCartComponent,
    ProductDetailsComponent
  ],
  providers: [
    
  ]
})
export class CustomerModule { }
