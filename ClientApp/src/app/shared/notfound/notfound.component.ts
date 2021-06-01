import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent extends BaseComponent implements OnInit {

  uri: string

  constructor() {
    super()
  }

  ngOnInit() {
    this.uri = window.location.pathname
  }

}
