import { OrderItemsService } from './Services/order-items.service';
import { ProductsService } from './Services/products-service.service';
import { ServerService} from './Services/server.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    CustomerModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedModule,
    AdminModule,
    MaterialModule
  ],
  providers: [
    ProductsService,
    OrderItemsService,
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
