import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CustomerProductsComponent } from './customer/customer-products/customer-products.component';
import { CustomerProductDetailsComponent } from './customer/customer-product-details/customer-product-details.component';
import { CartComponent } from './customer/cart/cart.component';
import { LoginComponent } from './shared/login/login.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { SignUpComponent } from './shared/sign-up/sign-up.component';
import { CustomerOrdersComponent } from './customer/customer-orders/customer-orders.component';
import { AdminGuardGuard } from './core/guards/admin-guard.guard';
import { CustomerGuardGuard } from './core/guards/customer-guard.guard';


const routes: Route[] = [
  { path: '', redirectTo: 'products', pathMatch: 'full', canActivate: [CustomerGuardGuard] },
  { path: 'products', component: CustomerProductsComponent, canActivate: [CustomerGuardGuard] },
  { path: 'products/:id', component: CustomerProductDetailsComponent, pathMatch: 'full', canActivate: [CustomerGuardGuard] },
  { path: 'cart', component: CartComponent, canActivate: [CustomerGuardGuard] },
  { path: 'login', component: LoginComponent, canActivate: [CustomerGuardGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [CustomerGuardGuard] },
  { path: '404', component: NotfoundComponent },
  { path: 'signup', component: SignUpComponent, canActivate: [CustomerGuardGuard] },
  { path: 'orders', component: CustomerOrdersComponent, canActivate: [CustomerGuardGuard] },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivateChild: [AdminGuardGuard]
  }
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
