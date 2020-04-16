import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './admin-products/admin-products.component';



@NgModule({
  declarations: [
    AdminProductsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdminProductsComponent
  ]
})
export class AdminModule { }
