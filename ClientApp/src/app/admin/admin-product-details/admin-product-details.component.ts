import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products-service.service';
import { Product } from '../../core/Model/product';
import { faImage, faUpload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PhotoServiceService } from '../../Services/photo-service.service';
import { ToastyService } from 'ng2-toasty';
import { BaseComponent } from '../../core/base/base.component';
import { fade } from 'src/app/core/animations/fade.amination';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Brand } from 'src/app/core/Model/brand';
import { ServerService } from 'src/app/Services/server.service';


@Component({
  selector: 'app-admin-product-details',
  templateUrl: './admin-product-details.component.html',
  styleUrls: ['./admin-product-details.component.scss'],
  animations: [fade]
})
export class AdminProductDetailsComponent extends BaseComponent implements OnInit {

  @ViewChild('uploadBtn', { static: false }) uploadBtn: ElementRef
  private product: Product
  private brands: Brand[]
  private imagePreview
  private form: FormGroup

  private selectedImage: File
  icons = {
    image: faImage,
    upload: faUpload,
    spinner: faSpinner
  }
  isUploading: boolean = false

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private photoService: PhotoServiceService,
    private toastyService: ToastyService,
    private server: ServerService) {
    super()
  }

  async ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id')
    this.product = (await this.productService.getProducts()).find(product => product.id == +productId)

    this.product.productImages = await this.photoService.getProductImages(this.product.id)

    console.log("ish")
    console.log(this.product)
    this.form = new FormGroup({
      model: new FormControl(this.product.model, [Validators.required, Validators.min(5), Validators.max(15)]),
      brandId: new FormControl(this.product.brandId, Validators.required),
      price: new FormControl(this.product.price, Validators.required),
      batteryCapacity: new FormControl(this.product.batteryCapacity, Validators.required),
      chargingTime: new FormControl(this.product.chargingTime, Validators.required),
      standByTime: new FormControl(this.product.standByTime, Validators.required),
      color: new FormControl(this.product.color, Validators.required),
      sizeInGram: new FormControl(this.product.sizeInGram, Validators.required)
    })

    this.brands = await this.productService.getProductBrands()
  }

  onSelected(file) {
    this.selectedImage = file
    let reader = new FileReader()
    reader.onload = (event) => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(this.selectedImage)
  }

  async uploadPhoto() {
    this.isUploading = true
    try {
      var result = await this.photoService.postProductImage(this.product.id, this.selectedImage)
      this.product.productImages.push({ name: this.selectedImage.name })
      this.toastyService.success({
        title: 'Succefull',
        msg: 'Image uploaded successfully',
        showClose: true,
        theme: 'bootstrap',
        timeout: 3000
      })
    } catch (e) {
      this.toastyService.success({
        title: 'Error',
        msg: 'An error occured',
        showClose: true,
        theme: 'bootstrap',
        timeout: 3000
      })
    }
    this.isUploading = false
    this.imagePreview = null
    
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

  submitUpdate() {
    this.server.put(`/products/${this.product.id}`, this.product).subscribe(res => {
      this.product.brand.name = this.form.value.brand
      this.product.batteryCapacity = this.form.value.batteryCapacity
      this.product.brandId = this.form.value.brandId
      this.product.chargingTime = this.form.value.chargingTime
      this.product.batteryCapacity = this.form.value.batteryCapacity
      this.product.color = this.form.value.color
      this.product.model = this.form.value.model
      this.product.price = this.form.value.price
      this.product.sizeInGram = this.form.value.sizeInGram
      this.product.standByTime = this.form.value.standByTime

      this.toastyService.success({
        title: 'Success',
        msg: 'Product successfully updated',
        showClose: true,
        theme: 'bootstrap',
        timeout: 5000
      })
      //do something
    })
  }
}
