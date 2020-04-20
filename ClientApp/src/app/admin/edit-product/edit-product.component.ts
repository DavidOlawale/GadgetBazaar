import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Product } from '../../Model/product';
import { ProductsService } from '../../Services/products-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product
  constructor(private route: ActivatedRouteSnapshot, private productService: ProductsService) { }

  async ngOnInit() {
    let productId = this.route.paramMap.get('id')
      this.product = (await this.productService.getProducts()).find(p => p.id == +productId)
  }

}
