import { Product } from '../../Model/product';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../Services/Auth.service';
import { ProductsService } from '../../Services/products-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {
  }

}
