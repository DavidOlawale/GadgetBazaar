import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products-service.service';
import { Product } from '../../Model/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = []
  constructor(private productsService: ProductsService) {
    productsService.getProducts().subscribe(products => {
      this.products = products
    })
  }

  ngOnInit() {
  }

}
