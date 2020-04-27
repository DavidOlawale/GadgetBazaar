import { Component, OnInit } from '@angular/core';
import { OrderItemsService } from '../../Services/order-items.service';
import { OrderItem } from '../../Model/order-item';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  private orderItems: OrderItem[]
  constructor(private orderItemsService: OrderItemsService) { }

  ngOnInit() {
    this.orderItems = this.orderItemsService.getOrderItems()

  }

}
