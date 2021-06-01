import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-order-error',
  templateUrl: './order-error.component.html',
  styleUrls: ['./order-error.component.scss']
})
export class OrderErrorComponent extends BaseComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
