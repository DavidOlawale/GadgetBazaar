import { ProductsService } from './../Services/products-service.service';
import { Product } from './../Model/product';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  private product: Product

  constructor(private route: ActivatedRoute, private productService: ProductsService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      let productId = Number(param.get('id'))
      this.productService.getProducts().subscribe( (products: Product[]) => {
        this.product = products.find(product => product.id == productId)                
      })  
    })
  }

}
