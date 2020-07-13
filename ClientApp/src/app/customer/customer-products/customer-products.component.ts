import { Component, OnInit } from '@angular/core';
import { Product } from '../../Model/product';
import { ProductsService } from '../../Services/products-service.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.css']
})
export class CustomerProductsComponent implements OnInit {
  products: Product[] = []

  constructor(private productsService: ProductsService, private auth: AuthService) {
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
