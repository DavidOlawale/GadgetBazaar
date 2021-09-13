import { Product } from '../core/Model/product';
import { Injectable, EventEmitter } from '@angular/core';
import { OrderItem } from '../core/Model/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsService {
  private orderItems: OrderItem[] = []
  public orderItemsAltered: EventEmitter<Product> = new EventEmitter<Product>()
  public orderItemQuantityAltered: EventEmitter<Product> = new EventEmitter<Product>()
  public AllItemsRemoved: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  getOrderItems(): OrderItem[] {
    return this.orderItems
  }
  getOrderItemById(id: Number): OrderItem{
    return this.orderItems.find(item => item.id == id)
  }
  addOrderItem(product: Product): void{
    if(this.containsProduct(product)){
      return
    }
    let orderItem = new OrderItem()
    orderItem.productId = product.id
    orderItem.product = product
    orderItem.quantity = 1
    this.orderItems.push(orderItem)    
    this.orderItemsAltered.emit(product)
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
  setQuantity(arg: {productId, quantity: number}){
    let item = this.orderItems.find(item => item.productId == arg.productId)
    item.quantity = arg.quantity
    this.orderItemQuantityAltered.emit(item.product)
  }
  increaseNumberInCart(product: Product){
    this.orderItems.find(item => item.productId == product.id).quantity += 1
    this.orderItemQuantityAltered.emit(product)
  }
  decreaseNumberInCart(product: Product){
    this.orderItems.find(item => item.productId == product.id).quantity -= 1
    this.orderItemQuantityAltered.emit(product)
  }
  remove(product: Product){
    this.orderItems =  this.orderItems.filter(item => item.productId != product.id)
    this.orderItemsAltered.emit(product)
  }

  removeAll() {
    this.orderItems = []
    this.AllItemsRemoved.emit()
  }
}
