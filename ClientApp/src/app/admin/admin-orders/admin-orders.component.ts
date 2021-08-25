import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../Services/server.service';
import { Order } from '../../core/Model/order';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent extends BaseComponent implements OnInit {

  private orders: Order[]
  constructor(private server: ServerService) {
    super()
  }

  async ngOnInit() {

    this.orders = await this.server.get('/orders').toPromise()
  }

}
