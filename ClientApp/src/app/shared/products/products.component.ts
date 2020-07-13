import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { fade } from '../../animations/fade.amination';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    fade
  ]
})
export class ProductsComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {
  }

}
