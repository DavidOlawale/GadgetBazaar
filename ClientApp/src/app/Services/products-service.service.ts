import { Product } from './../Model/product';
import { Injectable } from '@angular/core';
import { Brand } from '../Model/brand';
import { ServerService } from './server.service';
import { HttpRequest, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private server: ServerService) {
  }

  async getProduct(id): Promise<Product> {
    return await this.server.get(`/products/${id}`).toPromise()
  }

  async getProducts(): Promise<Product[]>{
    return await this.server.get(`/products`).toPromise()
  }

  async getFilteredProducts(minPrice: string, maxPrice: string, brandId: string): Promise<Product[]> {
    let params = new HttpParams()
    .set('minPrice', minPrice)
    .set('maxPrice', maxPrice)
    .set('brandId', brandId)

    return await this.server.get('/products', params).toPromise()
  }

  async getSimilarProducts(productId): Promise<Product[]> {
    return await this.server.get(`/products/${productId}/similar`).toPromise()
  }

  async getProductBrands(): Promise<Brand[]> {
    return await this.server.get('/brands').toPromise()
  }

}
