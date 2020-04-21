import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './customer/cart/cart.component';
import { LoginComponent } from './login/login.component';
import { NewProductComponent } from './admin/new-product/new-product.component';


const routes: Route[] = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'products/new', component: NewProductComponent },
  { path: 'products/:id', component: ProductDetailsComponent, pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/:id/edit', component: EditProductComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
