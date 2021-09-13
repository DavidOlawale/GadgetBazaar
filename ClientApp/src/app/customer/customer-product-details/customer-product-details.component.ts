import { ProductsService } from '../../Services/products-service.service';
import { Product } from '../../core/Model/product';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fade } from '../../core/animations/fade.amination';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-customer-product-details',
  templateUrl: './customer-product-details.component.html',
  styleUrls: ['./customer-product-details.component.scss'],
  animations: [fade]
})
export class CustomerProductDetailsComponent extends BaseComponent implements OnInit {
  private product: Product
  private similarProducts: Product[]
  @ViewChild('similarProductsContainer', { static: true }) similarProductsContainer: ElementRef

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductsService) {
    super()
  }

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id')

    this.productService.getProduct(productId).then((product: Product) => {
      this.product = product

      //if no product is returned
      if (!this.product) {
        this.router.navigateByUrl('/404', { skipLocationChange: true })
      }
    })

    //load similar products
    this.productService.getSimilarProducts(productId).then(products => {
      this.similarProducts = products
    })
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

  scrollSimilarProductsLeft() {
    let elementToScroll = this.similarProductsContainer.nativeElement
    elementToScroll.scrollLeft = elementToScroll.scrollLeft - 100
  }

  scrollSimilarProductsRight() {
    let elementToScroll = this.similarProductsContainer.nativeElement
    elementToScroll.scrollLeft = elementToScroll.scrollLeft + 100
  }

}
