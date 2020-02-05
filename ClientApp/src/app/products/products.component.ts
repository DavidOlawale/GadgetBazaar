import { ProductsService } from './../Services/products-service.service';
import { Product } from './../Model/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit {
  products: Product[];
  constructor(private productsService: ProductsService) {
    this.products = productsService.getDevices()
   }

  ngOnInit() {
  }

}
