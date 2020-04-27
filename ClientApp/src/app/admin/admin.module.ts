import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminProductDetailsComponent } from './admin-product-details/admin-product-details.component';
import { RouterModule } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FormsModule } from '@angular/forms';
import { NewProductComponent } from './new-product/new-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastyModule } from 'ng2-toasty';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminProductDetailsComponent,
    EditProductComponent,
    NewProductComponent,
    NewProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    ToastyModule.forRoot()
  ],
  exports: [
    AdminProductsComponent,
    AdminProductDetailsComponent,
    EditProductComponent
  ]
})
export class AdminModule { }
