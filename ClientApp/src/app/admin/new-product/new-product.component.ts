import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/Model/product';
import { Router } from '@angular/router';
import { ProductsService } from '../../Services/products-service.service';
import { Brand } from '../../core/Model/brand';
import { ServerService } from '../../Services/server.service';
import { ToastyService } from 'ng2-toasty';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent extends BaseComponent implements OnInit {
  private product: Product = new Product()
  private brands: Brand[]
  private form: FormGroup

  constructor(private router: Router,
    private server: ServerService,
    private productService: ProductsService,
    private toastyService: ToastyService) {
    super()
  }

  async ngOnInit() {
    this.form = new FormGroup({
      model: new FormControl(null, [Validators.required, Validators.min(5), Validators.max(15)]),
      brandId: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      batteryCapacity: new FormControl(null, Validators.required),
      chargingTime: new FormControl(null, Validators.required),
      standByTime: new FormControl(null, Validators.required),
      color: new FormControl(null, Validators.required),
      sizeInGram: new FormControl(null, Validators.required)
    })

    this.brands = await this.productService.getProductBrands()
  }
  submit() {
    let formValue = this.form.value
    formValue.brandId = +formValue.brandId
    this.server.post('/products', formValue).subscribe(this.onSubmitSucceded, this.onSubmitFailed)
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

  onSubmitFailed = () => {
    this.toastyService.success({
      title: 'Error',
      msg: 'An error occured',
      showClose: true,
      theme: 'bootstrap',
      timeout: 3000
    })
  }


}
