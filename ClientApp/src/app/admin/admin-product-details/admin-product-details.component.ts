import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products-service.service';
import { Product } from '../../core/Model/product';
import { faImage, faUpload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PhotoServiceService } from '../../Services/photo-service.service';
import { ToastyService } from 'ng2-toasty';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-admin-product-details',
  templateUrl: './admin-product-details.component.html',
  styleUrls: ['./admin-product-details.component.scss']
})
export class AdminProductDetailsComponent extends BaseComponent implements OnInit {

  @ViewChild('uploadBtn', { static: false }) uploadBtn: ElementRef
  private product: Product
  imagePreview

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
    private toastyService: ToastyService) {
    super()
  }

  async ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id')
    this.product = (await this.productService.getProducts()).find(product => product.id == +productId)

    this.product.productImages = await this.photoService.getProductImages(this.product.id)
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
}
