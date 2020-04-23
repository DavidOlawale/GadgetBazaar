import { Component, OnInit } from '@angular/core';
import { Product } from '../../Model/product';
import { Router } from '@angular/router';
import { ProductsService } from '../../Services/products-service.service';
import { Brand } from '../../Model/brand';
import { ServerService } from '../../Services/server.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  private product: Product = new Product()
  private brands: Brand[]
  constructor(private router: Router, private server: ServerService, private productService: ProductsService) { }

  async ngOnInit() {
    this.brands = await this.productService.getProductBrands()
  }
  submit() {
    this.product.brandId = +this.product.brandId
    this.server.post('/products', this.product).subscribe(this.onSubmitSucceded, this.onSubmitFailed)
  }

  onSubmitSucceded = () => {
    this.router.navigate(['/products'])
  }

  onSubmitFailed =() => {
    alert('failed')
  }


}
