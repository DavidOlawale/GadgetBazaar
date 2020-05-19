import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { ProductsComponent } from './shared/products/products.component';
import { ProductDetailsComponent } from './shared/product-details/product-details.component';
import { CartComponent } from './customer/cart/cart.component';
import { LoginComponent } from './shared/login/login.component';
import { NewProductComponent } from './admin/new-product/new-product.component';
import { LogoutComponent } from './shared/logout/logout.component';


const routes: Route[] = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'products/new', component: NewProductComponent },
  { path: 'products/:id', component: ProductDetailsComponent, pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent }
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
