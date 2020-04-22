import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { AlterInCartComponent } from './alter-in-cart/alter-in-cart.component';
import { CustomerProductsComponent } from './customer-products/customer-products.component';
import { CustomerProductDetailsComponent } from './customer-product-details/customer-product-details.component';
import { ProductDisplayComponent} from './product-display/product-display.component'
import { ProductFilterComponent } from './product-filter/product-filter.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'



@NgModule({
  declarations: [
    AlterInCartComponent,
    CartComponent,
    CustomerProductsComponent,
    CustomerProductDetailsComponent,
    ProductDisplayComponent,
    ProductFilterComponent,

  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    AlterInCartComponent,
    CartComponent,
    CustomerProductsComponent,
    CustomerProductDetailsComponent,
    ProductDisplayComponent,
    ProductFilterComponent
  ],
  providers: [
    
  ]
})
export class CustomerModule { }
