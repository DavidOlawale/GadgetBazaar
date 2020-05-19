import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
