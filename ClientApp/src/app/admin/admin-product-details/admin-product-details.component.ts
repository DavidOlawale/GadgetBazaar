import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products-service.service';
import { Product } from '../../core/Model/product';
import { faImage, faUpload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PhotoServiceService } from '../../Services/photo-service.service';
import { ToastyService } from 'ng2-toasty';
import { BaseComponent } from '../../core/base/base.component';
import { fade } from 'src/app/core/animations/fade.amination';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/core/Model/brand';
import { ServerService } from 'src/app/Services/server.service';


@Component({
  selector: 'app-admin-product-details',
  templateUrl: './admin-product-details.component.html',
  styleUrls: ['./admin-product-details.component.scss'],
  animations: [fade]
})
export class AdminProductDetailsComponent extends BaseComponent implements OnInit {

  @ViewChild('uploadBtn', { static: false }) private uploadBtn: ElementRef
  private product: Product
  private brands: Brand[]
  private form: FormGroup
  private selectedImage: File
  private isUploading: boolean = false
  private uploadImagePreview
  @ViewChild('uploadImageInput', {static: false}) private uploadImageInput: ElementRef

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private photoService: PhotoServiceService,
    private toastyService: ToastyService,
    private server: ServerService,
    private fb: FormBuilder) {
    super()
  }

  async ngOnInit() {
    let productId = this.route.snapshot.params.id
    this.product = (await this.productService.getProducts()).find(product => product.id == +productId)

    this.product.productImages = await this.photoService.getProductImages(this.product.id)

    this.form = this.fb.group({
      model: [this.product.model, [Validators.required, Validators.min(5), Validators.max(15)]],
      brandId: [this.product.brandId, Validators.required],
      price: [this.product.price, Validators.required],
      batteryCapacity: [this.product.batteryCapacity, Validators.required],
      chargingTime: [this.product.chargingTime, Validators.required],
      standByTime: [this.product.standByTime, Validators.required],
      color: [this.product.color, Validators.required],
      sizeInGram: [this.product.sizeInGram, Validators.required]
    })

    this.brands = await this.productService.getProductBrands()
  }

  onImageSelected(file) {
    this.selectedImage = file
    let reader = new FileReader()
    reader.onload = (e) => {
      this.uploadImagePreview = reader.result
    }
    reader.readAsDataURL(this.selectedImage)
  }

  onImageUnselected(){
    this.selectedImage = null
    this.uploadImagePreview = null
  }

  async uploadPhoto() {
    this.isUploading = true
    try {
      let result = await this.photoService.postProductImage(this.product.id, this.selectedImage)
      console.log('ersult', result)
      this.product.productImages.push({ name: result.name })
      this.toastyService.success({
        title: 'Succefull',
        msg: 'Image uploaded successfully',
        showClose: true,
        theme: 'bootstrap',
        timeout: 3000
      })
    } catch (e) {
      console.log("error", e)
      this.toastyService.error({
        title: 'Error',
        msg: 'An error occured',
        showClose: true,
        theme: 'bootstrap',
        timeout: 3000
      })
    }
    this.isUploading = false
    this.uploadImagePreview = null
    
  }

  hasPhoto(product: Product): boolean {
    if (!product) return false
    return product.productImages && product.productImages.length > 0
  }

  submitUpdate() {
    this.server.put(`/products/${this.product.id}`, this.product).subscribe(res => {
      this.product.batteryCapacity = this.form.value.batteryCapacity
      this.product.brandId = this.form.value.brandId
      this.product.chargingTime = this.form.value.chargingTime
      this.product.batteryCapacity = this.form.value.batteryCapacity
      this.product.color = this.form.value.color
      this.product.model = this.form.value.model
      this.product.price = this.form.value.price
      this.product.sizeInGram = this.form.value.sizeInGram
      this.product.standByTime = this.form.value.standByTime
      this.product.brand.name = this.brands.find(b => b.id == this.form.value.brandId).name

      this.toastyService.success({
        title: 'Success',
        msg: 'Product successfully updated',
        showClose: true,
        theme: 'bootstrap',
        timeout: 5000
      })

    })
  }

  async archiveProduct() {
    try {
      let product = await this.server.get(`/products/${this.product.id}/archive`).toPromise()
      this.product.isArchived = (product as Product).isArchived
      this.toastyService.success({ title: '', msg: `${this.product.model} has been archived`, theme: 'bootstrap' })
    } catch (e) {
      this.toastyService.error({ title: '', msg: `Could not archive ${this.product.model}`, theme: 'bootstrap' })
    }
  }

  async unArchiveProduct() {
    try {
      let product = await this.server.get(`/products/${this.product.id}/unarchive`).toPromise()
      this.product.isArchived = (product as Product).isArchived
      this.toastyService.success({ title: '', msg: `${this.product.model} has been restored from  archive`, theme: 'bootstrap' })
    } catch (e) {
      this.toastyService.error({ title: '', msg: `Could not restore ${this.product.model} from archive`, theme: 'bootstrap' })
    }

  }

  async deleteProduct() {
    try {
      let result = await this.server.delete(`/products/${this.product.id}`).toPromise()
      this.toastyService.success({ title: '', msg: `${this.product.model} has been deleted`, theme: 'bootstrap' })
      this.router.navigate(['/admin/products'])
    } catch (e) {
      this.toastyService.error({ title: '', msg: `Could not delete ${this.product.model}`, theme: 'bootstrap' })
    }
    
  }

}
