import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-ordered',
  templateUrl: './ordered.component.html',
  styleUrls: ['./ordered.component.scss']
})
export class OrderedComponent extends BaseComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
