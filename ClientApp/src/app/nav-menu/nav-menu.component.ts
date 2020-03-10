import { OrderItemsService } from './../Services/order-items.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  orderItemsNumber: number

  constructor(private orderItemsService: OrderItemsService) {
    this.orderItemsNumber = orderItemsService.getOrderItems.length
    orderItemsService.orderItemsAltered.subscribe(() => this.orderItemsNumber = this.orderItemsService.getOrderItems().length)
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
