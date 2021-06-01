import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { fade } from '../../core/animations/fade.amination';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    fade
  ]
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(private auth: AuthService) {
    super()
  }

  ngOnInit() {
  }

}
