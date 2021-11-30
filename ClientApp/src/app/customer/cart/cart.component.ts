import { OrderItem } from '../../core/Model/order-item';
import { OrderItemsService } from '../../Services/order-items.service';
import { Component, OnInit } from '@angular/core';
import { fade } from '../../core/animations/fade.amination';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    fade
  ]
})
export class CartComponent extends BaseComponent implements OnInit {
  orderItems: OrderItem[]
  totalPrice: number

  constructor(private orderItemsService: OrderItemsService) {
    super()
  }

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
