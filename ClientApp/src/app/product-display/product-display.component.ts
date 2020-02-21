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
  constructor(private orderItemsService: OrderItemsService) { 
    orderItemsService.orderItemsAltered.subscribe(data => this.isInCart = orderItemsService.containsProduct(this.product))
  }
  private isInCart: boolean
  private numberInCart

  ngOnInit() {
    this.isInCart = this.orderItemsService.containsProduct(this.product)
    this.numberInCart = this.orderItemsService.numberInCart(this.product)
    
    this.orderItemsService.orderItemsAltered.subscribe((product) => {      
      if (product != this.product)
        return
      this.isInCart = this.orderItemsService.containsProduct(this.product)
      this.numberInCart = this.orderItemsService.numberInCart(this.product)
    })

    this.orderItemsService.orderItemQuantityAltered.subscribe(product =>{      
      if (product != this.product)
        return
        this.numberInCart = this.orderItemsService.numberInCart(this.product)
    })
  }
  increaseInCart(){
    this.orderItemsService.increaseNumberInCart(this.product)
  }
  decreaseInCart(){
    this.orderItemsService.decreaseNumberInCart(this.product)
  }
  addToCart =() => this.orderItemsService.addOrderItem(this.product)
  
  removeFromCart = () => this.orderItemsService.remove(this.product.id)
  
}
