import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Brand } from '../Model/brand';
import { BrandService } from '../Services/brand.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
private brands: Brand[]
  constructor(private brandService: BrandService) { }
  @Output() brandChanged = new EventEmitter<any>()
  @Output() minPriceChanged = new EventEmitter<number>()
  @Output() maxPriceChanged = new EventEmitter<number>()

  ngOnInit() {
    this.brandService.getBrands().subscribe(brands => this.brands = brands)
  }

  onBrandChange = (brand: Brand) => this.brandChanged.emit(brand)

  onMinPriceChange = (price: number) => this.minPriceChanged.emit(price)
  onMaxPriceChange = (price: number) =>this.maxPriceChanged.emit(price)
}