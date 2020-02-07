import { Product } from './../Model/product';
import { Injectable, EventEmitter } from '@angular/core';
import { OrderItem } from '../Model/order-item';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsService {
  private orderItems: OrderItem[] = []
  public orderItemAdded: EventEmitter<Product> = new EventEmitter<Product>()
  public orderItemQuantityAltered: EventEmitter<Product> = new EventEmitter<Product>()
  getOrderItems(): OrderItem[] {
    return this.orderItems
  }
  getOrderItemById(id: Number): OrderItem{
    return this.orderItems.find(item => item.id == id)
  }
  addOrderItem(product: Product): void{
    if(this.containsProduct(product)){
      throw error('Item already in cart')
    }
    let orderItem = new OrderItem()
    orderItem.productId = product.id
    orderItem.product = product
    orderItem.quantity = 1
    this.orderItems.push(orderItem)
    console.log(this.orderItems);
    
    this.orderItemAdded.emit(product)
  }

  containsProduct(product: Product): boolean{
    return this.orderItems.map(item => item.productId).includes(product.id)
  }
  numberInCart(product: Product): Number{
    let itemInCart = this.orderItems.find(item => item.productId == product.id)
    if(!itemInCart)
      return 0
    return itemInCart.quantity
  }
  increaseNumberInCart(product: Product){
    this.orderItems.find(item => item.productId == product.id).quantity += 1
    this.orderItemQuantityAltered.emit(product)
  }
  decreaseNumberInCart(product: Product){
    this.orderItems.find(item => item.productId == product.id).quantity -= 1
    this.orderItemQuantityAltered.emit(product)
  }
  constructor() { }
}