import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../core/Model/order';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from '../../Services/server.service';
import { Product } from '../../core/Model/product';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.scss']
})
export class AdminOrderDetailsComponent extends BaseComponent implements OnInit {
  private order: Order
  private totalPrice: Number
  private updatingOrderStatus: boolean
  constructor(private server: ServerService, private route: ActivatedRoute) {
    super()
  }

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.order = await this.server.get('/orders/' + id).toPromise()
    console.log(this.order);
    this.calcTotalPrice()
  }

  hasPhoto(product: Product): boolean {
    var a = this
    return product.productImages.length != 0
  }

  displayPhoto(product: Product): string {
    return product.productImages[0].name
  }

  calcTotalPrice() {
    let total = 0
    for (let item of this.order.orderItems) {
      total += item.product.price * item.quantity
    }
    this.totalPrice = total
  }

  markAsDelivered() {
    this.updatingOrderStatus = true
    let thisComponet = this
    this.server.put(`/orders/MarkAsDelivered/${this.order.id}`, {}).subscribe(function () {
      this.updatingOrderStatus = false;
      this.order.status.value = "Delivered"

    }.bind(this))
  }
}
