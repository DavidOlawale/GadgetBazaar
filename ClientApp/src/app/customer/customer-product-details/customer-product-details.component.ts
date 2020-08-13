import { ProductsService } from '../../Services/products-service.service';
import { Product } from '../../Model/product';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-customer-product-details',
  templateUrl: './customer-product-details.component.html',
  styleUrls: ['./customer-product-details.component.scss']
})
export class CustomerProductDetailsComponent implements OnInit {
  private product: Product

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductsService) {
    let productId = this.route.snapshot.paramMap.get('id')

    this.productService.getProducts().then((products: Product[]) => {
      this.product = products.find(product => product.id == +productId)
      if (!this.product) {
        this.router.navigateByUrl('/404', { skipLocationChange: true })
      }
    })
  }

  ngOnInit() {

  }

  hasPhoto(product: Product): boolean {
    if (!product) {
      return false
    }
    return product.productImages && product.productImages.length > 0
  }

  getPhoto(product: Product): string {
    return `images/products/${product.productImages[0].name}`
  }


}
