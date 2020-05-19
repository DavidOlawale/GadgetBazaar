import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../Model/order-item';
import { OrderItemsService } from '../../Services/order-items.service';
import { ServerService } from '../../Services/server.service';
import { Order } from '../../Model/order';
import { AuthService } from '../../Services/Auth.service';
import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  private orderItems: OrderItem[]

  constructor(private orderItemsService: OrderItemsService,
    private server: ServerService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.orderItems = this.orderItemsService.getOrderItems()
  }

  placeOrder() {
    console.log('clicked')
    let order = new Order()
    order.customerId = this.auth.customerId
    order.orderItems = this.orderItems
    this.server.post('/orders', order).subscribe(this.onPlaceOrderSuccess, this.onPlaceOrderError)
  }

  onPlaceOrderSuccess = () => {
    this.router.navigate(['order-success'])
    this.orderItemsService.removeAll()
  }
  onPlaceOrderError = () => {
    this.router.navigate(['order-error'])
  }

}
