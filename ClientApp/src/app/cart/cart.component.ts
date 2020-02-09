import { OrderItem } from './../Model/order-item';
import { OrderItemsService } from './../Services/order-items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private orderItems: OrderItem[]

  constructor(private orderItemsService: OrderItemsService) { 
    this.orderItems = orderItemsService.getOrderItems()
    
    orderItemsService.orderItemAdded.subscribe(item =>{
      this.orderItems = orderItemsService.getOrderItems()
    })
    orderItemsService.orderItemQuantityAltered.subscribe()
  }

  ngOnInit() {

  }

}
