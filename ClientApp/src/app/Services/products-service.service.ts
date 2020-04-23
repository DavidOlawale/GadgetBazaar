import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './../Model/product';
import { Injectable } from '@angular/core';
import { Brand } from '../Model/brand';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[]
  brands: Brand[]
  constructor(private server: ServerService) {
  }

  async getProducts(): Promise<Product[]>{
    return this.products ? this.products : await this.loadProducts()
  }

  async getProductBrands() {
    return this.brands ? this.brands : await this.loadBrands()
  }

  async loadProducts(): Promise<Product[]> {
    this.products = await this.server.get('/products').toPromise()
    return this.products
  }


  async loadBrands(): Promise<Brand[]> {
    this.brands = await this.server.get('/brands').toPromise()
    return this.brands
  }
}
