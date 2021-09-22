import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products-service.service';
import { Product } from '../../core/Model/product';
import { BaseComponent } from '../../core/base/base.component';
import { fade } from 'src/app/core/animations/fade.amination';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
  animations: [fade]
})
export class AdminProductsComponent extends BaseComponent implements OnInit {
  products: Product[] = []
  constructor(private productsService: ProductsService) {
    super()
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
    return product.productImages[0].name
  }

}
