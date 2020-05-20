import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../Model/product';
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
  ngOnInit() { }

  productClicked() {
  }

  hasPhoto(product: Product): boolean {
    return product.productImages && product.productImages.length > 0
  }

  getPhoto(product: Product): string {
    return `images/products/${product.productImages[0].name}`
  }

  
}
