import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../Services/server.service';
import { Order } from '../../Model/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  private orders: Order[]
  constructor(private server: ServerService) { }

  async ngOnInit() {

    this.orders = await this.server.get('/orders').toPromise()
  }

}
