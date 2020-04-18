import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminProductDetailsComponent } from './admin-product-details/admin-product-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AdminProductsComponent,
    AdminProductDetailsComponent
  ]
})
export class AdminModule { }
