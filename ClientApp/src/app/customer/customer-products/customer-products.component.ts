import { Component, OnInit } from '@angular/core';
import { Product } from '../../Model/product';
import { ProductsService } from '../../Services/products-service.service';
import { AuthService } from '../../Services/Auth.service';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.css']
})
export class CustomerProductsComponent implements OnInit {
  products: Product[] = []
  productsToDisplay: Product[]
  selectedBrandId: number = 0
  minPrice: number
  maxPrice: number

  constructor(private productsService: ProductsService, private auth: AuthService) {
    productsService.getProducts().then(products => {
      this.products = products
    })
  }

  ngOnInit() {
  }

  onBrandChanged = (brandId) => this.selectedBrandId = brandId
  onMinPriceChanged = (min) => this.minPrice = min
  onMaxPriceChanged = (max) => this.maxPrice = max

  get getFilteredProducts() {
    let filteredByBrand = this.products.filter(p => this.selectedBrandId == 0 || p.brandId == this.selectedBrandId)
    let filteredByMinPrice = filteredByBrand.filter(p => !this.minPrice || p.price >= Number(this.minPrice))
    let filteredByMaxPrice = filteredByMinPrice.filter(p => !this.maxPrice || p.price <= Number(this.maxPrice))
    return filteredByMaxPrice

  }

}
