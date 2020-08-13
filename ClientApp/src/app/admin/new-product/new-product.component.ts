import { Component, OnInit } from '@angular/core';
import { Product } from '../../Model/product';
import { Router } from '@angular/router';
import { ProductsService } from '../../Services/products-service.service';
import { Brand } from '../../Model/brand';
import { ServerService } from '../../Services/server.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  private product: Product = new Product()
  private brands: Brand[]

  constructor(private router: Router,
    private server: ServerService,
    private productService: ProductsService,
    private toastyService: ToastyService) { }

  async ngOnInit() {
    this.brands = await this.productService.getProductBrands()
  }
  submit() {
    this.product.brandId = +this.product.brandId
    this.server.post('/products', this.product).subscribe(this.onSubmitSucceded, this.onSubmitFailed)
  }

  onSubmitSucceded = () => {
    this.toastyService.success({
      title: 'Success',
      msg: 'Product added successfully',
      showClose: true,
      theme: 'bootstrap',
      timeout: 3000
    })
    this.router.navigate(['/products'])
  }

  onSubmitFailed =() => {
    this.toastyService.success({
      title: 'Error',
      msg: 'An error occured',
      showClose: true,
      theme: 'bootstrap',
      timeout: 3000
    })
  }


}
