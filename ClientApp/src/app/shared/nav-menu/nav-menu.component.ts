import { OrderItemsService } from '../../Services/order-items.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent extends BaseComponent implements OnInit {
  isExpanded = false;
  orderItemsNumber: number
  isLogedIn: boolean
  email: string

  constructor(
    private orderItemsService: OrderItemsService,
    private auth: AuthService,
  ) {
    super()
    this.orderItemsNumber = orderItemsService.getOrderItems.length
    this.isLogedIn = auth.isLogedIn
    if (this.isLogedIn)
      this.email = auth.email
    
  }
  ngOnInit(): void {
    this.orderItemsService.orderItemsAltered.subscribe(() => this.orderItemsNumber = this.orderItemsService.getOrderItems().length)

    this.auth.LogedIn.subscribe(() => {
      this.isLogedIn = true
      this.email = this.auth.email
    })

    this.auth.logedOut.subscribe(() => {
      this.isLogedIn = false
    })
      
  }

  collapse() {
    this.isExpanded = false
  }

  toggle() {
    this.isExpanded = !this.isExpanded
  }

  logOut() {
    this.auth.logOut()
  }
}
