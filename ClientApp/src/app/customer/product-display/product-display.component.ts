import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../core/Model/product';
import { Router } from '@angular/router';
import { fade } from '../../core/animations/fade.amination';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss'],
  animations: [fade]
})
export class ProductDisplayComponent extends BaseComponent implements OnInit {
  @Input() product: Product
  constructor(private router: Router) {
    super()
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
