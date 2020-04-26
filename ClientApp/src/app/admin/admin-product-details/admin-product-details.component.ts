import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products-service.service';
import { Product } from '../../Model/product';
import { faImage, faUpload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PhotoServiceService } from '../../Services/photo-service.service';


@Component({
  selector: 'app-admin-product-details',
  templateUrl: './admin-product-details.component.html',
  styleUrls: ['./admin-product-details.component.css']
})
export class AdminProductDetailsComponent implements OnInit {

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
    private photoService: PhotoServiceService) {
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
      console.log('event', event)
    }
    reader.readAsDataURL(this.selectedImage)

  }

  async uploadPhoto() {
    this.isUploading = true
    try {
      var result = await this.photoService.postProductImage(this.product.id, this.selectedImage)
      this.product.productImages.push({ name: this.selectedImage.name })
    } catch (e) {
      alert('An error occured')
    }
    this.isUploading = false
    this.imagePreview = null
    
  }
}
