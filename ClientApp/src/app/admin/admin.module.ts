import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminProductsComponent } from "./admin-products/admin-products.component";
import { AdminProductDetailsComponent } from "./admin-product-details/admin-product-details.component";
import { RouterModule, Route } from "@angular/router";
import { EditProductComponent } from "./edit-product/edit-product.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NewProductComponent } from "./new-product/new-product.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";
import { AdminOrderDetailsComponent } from './admin-order-details/admin-order-details.component';

const routes: Route[] = [
  {path: '', component: AdminProductsComponent, pathMatch: 'full'},
  {path: 'products', component: AdminProductsComponent, pathMatch: 'full'},
  { path: "products/:id/edit", component: EditProductComponent },
  { path: "orders", component: AdminOrdersComponent },
  { path: "orders/:id", component: AdminOrderDetailsComponent },
  { path: 'products/new', component: NewProductComponent },
];

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminProductDetailsComponent,
    EditProductComponent,
    NewProductComponent,
    NewProductComponent,
    AdminOrdersComponent,
    AdminOrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminProductsComponent,
    AdminProductDetailsComponent,
    EditProductComponent,
    NewProductComponent,
    NewProductComponent,
    AdminOrdersComponent,
    AdminOrderDetailsComponent,
  ]
})
export class AdminModule {}
