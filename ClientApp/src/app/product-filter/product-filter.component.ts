import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.brandService.getBrands().subscribe(brands => this.brands = brands)
  }

}
