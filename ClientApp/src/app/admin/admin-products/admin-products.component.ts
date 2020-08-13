import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products-service.service';
import { Product } from '../../Model/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = []
  constructor(private productsService: ProductsService) {
    productsService.getProducts().then((products: Product[]) => {
      this.products = products
    })
  }

  ngOnInit() {
  }

  hasPhoto(product: Product): boolean {
    return product.productImages && product.productImages.length > 0
  }

  getPhoto(product: Product): string {
    return `images/products/${product.productImages[0].name}`
  }

}
