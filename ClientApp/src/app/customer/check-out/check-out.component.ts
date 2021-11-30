import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../core/Model/order-item';
import { OrderItemsService } from '../../Services/order-items.service';
import { ServerService } from '../../Services/server.service';
import { Order } from '../../core/Model/order';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { fade } from '../../core/animations/fade.amination';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
  animations: [
    fade
  ]
})
export class CheckOutComponent extends BaseComponent implements OnInit {
  orderItems: OrderItem[]

  constructor(private orderItemsService: OrderItemsService,
    private server: ServerService,
    private auth: AuthService,
    private router: Router) {
    super()
  }

  ngOnInit() {
    this.orderItems = this.orderItemsService.getOrderItems()
  }

  placeOrder() {
    let order = new Order()
    order.customerId = this.auth.customerId
    order.orderItems = this.orderItems
    this.server.post('/orders', order).subscribe(this.onPlaceOrderSuccess, this.onPlaceOrderError)
  }

  onPlaceOrderSuccess = () => {
    this.router.navigate(['order-success'])
    this.orderItemsService.removeAll()
  }
  onPlaceOrderError = (error) => {
    this.router.navigate(['order-error'])
  }

  get canPlaceOrder(): boolean {
    return this.orderItems.length == 0 && this.auth.isLogedIn
  }

  get totalPrice() {
    let total = 0
    this.orderItems.forEach((item) => {
      total += item.product.price * item.quantity
    })

    return total
  }

}
