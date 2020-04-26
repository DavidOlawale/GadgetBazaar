import { OrderItem } from '../../Model/order-item';
import { OrderItemsService } from '../../Services/order-items.service';
import { Component, OnInit } from '@angular/core';
import { Subject, merge } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private orderItems: OrderItem[]
  private totalPrice: number = 0

  constructor(private orderItemsService: OrderItemsService) {}

  ngOnInit() {
    this.orderItems = this.orderItemsService.getOrderItems()

    this.orderItemsService.orderItemsAltered.subscribe(item => this.orderItems = this.orderItemsService.getOrderItems())

    // change total price when order items change or when an order item's quantity change
    merge(this.orderItemsService.orderItemQuantityAltered, this.orderItemsService.orderItemsAltered).subscribe(() => {
      this.totalPrice = this.getTotalPrice()
    })

  }

  quantityChanged(arg) {
    this.orderItemsService.setQuantity(arg)
  }


  getTotalPrice(): number {
    if (this.orderItems.length == 0) {
      return 0
    }
    return this.orderItems
      .map(item => item.product.price * item.quantity) // returns an array of the prices
      .reduce((first, second) => first + second)  // returns an addition of all prices
  }
}
