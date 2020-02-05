import { OrderItemsService } from './../Services/order-items.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../Model/product';
import { OrderItem } from '../Model/order-item';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  @Input() product: Product
  constructor(private orderItemsService: OrderItemsService) { }
  private isInCart: boolean
  private numberInCart
  ngOnInit() {
    this.isInCart = this.orderItemsService.containsProduct(this.product)
    this.numberInCart = this.orderItemsService.numberInCart(this.product)

    this.orderItemsService.orderItemAdded.subscribe(() => {      
      this.isInCart = this.orderItemsService.containsProduct(this.product)
      this.numberInCart = this.orderItemsService.numberInCart(this.product)
    })

  }
  increaseInCart(){
    this.orderItemsService.increaseNumberInCart(this.product)
  }
  decreaseInCart(){
    this.orderItemsService.decreaseNumberInCart(this.product)
  }

  addToCart(){
    this.orderItemsService.addOrderItem(this.product)
  }
  
}
