import { OrderItemsService } from '../../Services/order-items.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  orderItemsNumber: number
  isLogedIn: boolean

  constructor(private orderItemsService: OrderItemsService, private auth: AuthService) {
    this.orderItemsNumber = orderItemsService.getOrderItems.length
    this.isLogedIn = auth.isLoggedIn
    
  }
  ngOnInit(): void {
    this.orderItemsService.orderItemsAltered.subscribe(() => this.orderItemsNumber = this.orderItemsService.getOrderItems().length)
    this.auth.alterLogin.subscribe((logedIn) => { this.isLogedIn = logedIn })
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut() {
    this.auth.logOut()
  }
}
