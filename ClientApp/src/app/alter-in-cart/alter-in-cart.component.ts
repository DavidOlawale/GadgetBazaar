import { OrderItemsService } from './../Services/order-items.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../Model/product';

@Component({
  selector: 'app-alter-in-cart',
  templateUrl: './alter-in-cart.component.html',
  styleUrls: ['./alter-in-cart.component.css']
})
export class AlterInCartComponent implements OnInit {

  @Input() public product: Product
  private isInCart: boolean
  private numberInCart: Number

  constructor(private orderItemsService: OrderItemsService) {
   }

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

removeFromCart = () => this.orderItemsService.remove(this.product)

}
