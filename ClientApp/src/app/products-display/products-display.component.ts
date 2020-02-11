import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onBrandChanged(){
    console.log('brand changed') 
  }

  onMinPriceChanged(){
    console.log('min price changed')
  }
  
  onMaxPriceChanged(){
    console.log('max price changed')
  }

}
