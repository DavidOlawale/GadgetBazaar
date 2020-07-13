import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Brand } from '../../Model/brand';
import { BrandService } from '../../Services/brand.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
private brands: Brand[]
  constructor(private brandService: BrandService) { }

  @Output() productsFiltered = new EventEmitter<{ min: number, max: number, brandId: number }>()

  @ViewChild('brandSelect', { static: true }) brandSelect
  @ViewChild('minPriceInput', { static: true }) minPriceInput
  @ViewChild('maxPriceInput', { static: true }) maxPriceInput


  ngOnInit() {
    this.brandService.getBrands().subscribe(brands => this.brands = brands)
  }

  onProductsFiltered() {
    this.productsFiltered.emit({ min: this.minPriceInput.nativeElement.value, max: this.maxPriceInput.nativeElement.value, brandId: this.brandSelect.nativeElement.value })
  }
}
