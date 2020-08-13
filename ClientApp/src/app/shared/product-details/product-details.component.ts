import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { fade } from '../../animations/fade.amination';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  animations: [
    fade
  ]
})
export class ProductDetailsComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
