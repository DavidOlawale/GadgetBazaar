import { Component, OnInit } from '@angular/core';
import { Product } from '../../Model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  private product: Product = new Product()
  constructor(router: Router) { }

  ngOnInit() {
  }

}
