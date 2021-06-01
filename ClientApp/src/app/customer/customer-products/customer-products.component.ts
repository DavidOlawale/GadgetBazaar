import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/Model/product';
import { ProductsService } from '../../Services/products-service.service';
import { AuthService } from '../../Services/auth.service';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent extends BaseComponent implements OnInit {
  products: Product[] = []

  constructor(private productsService: ProductsService, private auth: AuthService) {
    super()
    productsService.getProducts().then(products => {
      this.products = products
    })
  }

  ngOnInit() {
    
  }

  async onProductsFiltered(value: { min: string, max: string, brandId: string }) {
    this.products = await this.productsService.getFilteredProducts(value.min, value.max, value.brandId)
  }

}
