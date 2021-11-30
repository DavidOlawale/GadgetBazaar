import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../Services/server.service';
import { Order } from '../../core/Model/order';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent extends BaseComponent implements OnInit {

  orders: Order[]
  constructor(private server: ServerService) {
    super()
  }

  ngOnInit() {
    this.server.get('/orders/myorders').subscribe(orders => {
      this.orders = orders
    })
  }

}
