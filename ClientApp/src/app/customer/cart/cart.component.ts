import { OrderItem } from '../../Model/order-item';
import { OrderItemsService } from '../../Services/order-items.service';
import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { fade } from '../../animations/fade.amination';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    fade
  ]
})
export class CartComponent implements OnInit {
  private orderItems: OrderItem[]
  private totalPrice: number

  constructor(private orderItemsService: OrderItemsService) {}

  ngOnInit() {
    this.orderItems = this.orderItemsService.getOrderItems()
    this.totalPrice = this.getTotalPrice()

    this.orderItemsService.orderItemsAltered.subscribe(item => this.orderItems = this.orderItemsService.getOrderItems())

  }

  quantityChanged(arg) {
    this.orderItemsService.setQuantity(arg)
  }


  getTotalPrice(): number {
    if (this.orderItemsService.getOrderItems().length == 0) {
      return 0
    }
    return this.orderItemsService.getOrderItems()
      .map(item => item.product.price * item.quantity) // returns an array of the prices
      .reduce((first, second) => first + second)  // returns an addition of all prices
  }
}
