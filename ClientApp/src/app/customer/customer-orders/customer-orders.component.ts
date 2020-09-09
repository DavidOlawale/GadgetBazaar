import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../Services/server.service';
import { Order } from '../../Model/order';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {

  private orders: Order[]
  constructor(private server: ServerService) { }

  ngOnInit() {
    this.server.get('/orders/myorders').subscribe(orders => {
      this.orders = orders
    })
  }

}
