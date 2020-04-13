import { OrderItemsService } from './../Services/order-items.service';
import { Component } from '@angular/core';
import { AuthService } from '../Services/Auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  isExpanded = false;
  orderItemsNumber: number
  isLogedIn: boolean

  constructor(private orderItemsService: OrderItemsService, private auth: AuthService) {
    this.orderItemsNumber = orderItemsService.getOrderItems.length
    orderItemsService.orderItemsAltered.subscribe(() => this.orderItemsNumber = this.orderItemsService.getOrderItems().length)
    this.isLogedIn = auth.isLoggedIn
    auth.alterLogin.subscribe(() => { this.isLogedIn = auth.isLoggedIn })
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut() {
    this.auth.logOut()
  }
}
