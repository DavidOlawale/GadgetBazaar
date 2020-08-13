import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { AlterInCartComponent } from './alter-in-cart/alter-in-cart.component';
import { CustomerProductsComponent } from './customer-products/customer-products.component';
import { CustomerProductDetailsComponent } from './customer-product-details/customer-product-details.component';
import { ProductDisplayComponent} from './product-display/product-display.component'
import { ProductFilterComponent } from './product-filter/product-filter.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckOutComponent } from './check-out/check-out.component'
import { RouterModule, Route } from '@angular/router';
import { OrderedComponent } from './ordered/ordered.component';
import { OrderErrorComponent } from './order-error/order-error.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { CustomerOrderDetailsComponent } from './customer-order-details/customer-order-details.component';


const childRoutes: Route[] = [
  { path: 'check-out', component: CheckOutComponent },
  { path: 'order-success', component: OrderedComponent },
  { path: 'order-error', component: OrderErrorComponent },
  { path: 'orders', component: CustomerOrdersComponent }
]

@NgModule({
  declarations: [
    AlterInCartComponent,
    CartComponent,
    CustomerProductsComponent,
    CustomerProductDetailsComponent,
    ProductDisplayComponent,
    ProductFilterComponent,
    CheckOutComponent,
    OrderedComponent,
    OrderErrorComponent,
    CustomerOrdersComponent,
    CustomerOrderComponent,
    CustomerOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forRoot(childRoutes)
  ],
  exports: [
    AlterInCartComponent,
    CartComponent,
    CustomerProductsComponent,
    CustomerProductDetailsComponent,
    ProductDisplayComponent,
    ProductFilterComponent,
    RouterModule
  ],
  providers: [
    
  ]
})
export class CustomerModule { }
