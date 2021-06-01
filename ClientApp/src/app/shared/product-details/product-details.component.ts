import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { fade } from '../../core/animations/fade.amination';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  animations: [
    fade
  ]
})
export class ProductDetailsComponent extends BaseComponent implements OnInit {

  constructor(private auth: AuthService) {
    super()
  }

  ngOnInit() {
  }

}
