import { OrderItemsService } from '.././../Services/order-items.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../Model/product';
import { OrderItem } from '../../Model/order-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  @Input() product: Product
  constructor(private router: Router) { 
  }
  ngOnInit(){}
  productClicked(){
    this.router.navigate(['/products', this.product.id])
  }
  
}
