import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminProductDetailsComponent } from './admin-product-details/admin-product-details.component';
import { RouterModule } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminProductDetailsComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    AdminProductsComponent,
    AdminProductDetailsComponent,
    EditProductComponent
  ]
})
export class AdminModule { }
