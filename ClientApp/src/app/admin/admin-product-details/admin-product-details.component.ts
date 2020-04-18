import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products-service.service';
import { Product } from '../../Model/product';

@Component({
  selector: 'app-admin-product-details',
  templateUrl: './admin-product-details.component.html',
  styleUrls: ['./admin-product-details.component.css']
})
export class AdminProductDetailsComponent implements OnInit {
  private product: Product

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductsService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      let productId = Number(param.get('id'))
      this.productService.getProducts().subscribe((products: Product[]) => {
        this.product = products.find(product => product.id == productId)
      })
    })
  }
}
