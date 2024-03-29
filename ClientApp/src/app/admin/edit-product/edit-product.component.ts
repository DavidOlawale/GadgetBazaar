import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/Model/product';
import { ProductsService } from '../../Services/products-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ServerService } from '../../Services/server.service';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent extends BaseComponent implements OnInit {

  product: Product
  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private server: ServerService,
    private router: Router
  ) {
    super()
  }

  async ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id')
      this.product = (await this.productService.getProducts()).find(p => p.id == +productId)
  }

  submit(form: NgForm) {
    this.server.put(`/products/${this.product.id}`, this.product).subscribe(res => {
      this.router.navigate(['/products', this.product.id])
    })
  }

}
