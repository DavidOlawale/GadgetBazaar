import { Component, OnInit } from '@angular/core';
import { Product } from '../../Model/product';
import { ProductsService } from '../../Services/products-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ServerService } from '../../Services/server.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product
  constructor(private route: ActivatedRoute, private productService: ProductsService, private server: ServerService) { }

  async ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id')
      this.product = (await this.productService.getProducts()).find(p => p.id == +productId)
  }

  submit(form: NgForm) {
    this.server.put(`/products/${this.product.id}`, this.product).subscribe(res => {
      console.log("res", res)
    })
  }

}
