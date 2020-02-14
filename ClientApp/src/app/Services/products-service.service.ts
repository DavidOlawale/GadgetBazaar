import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './../Model/product';
import { Injectable } from '@angular/core';
import { Brand } from '../Model/brand';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient){
  }
  // products: Product[] = [
  //   {
  //     id: 1,
  //     model: 'Infinix Hot 7',
  //     brandId: 3,
  //     brand: new Brand(),
  //     price: 45000
  //   },
  //   {
  //     id: 2,
  //     model: 'Iphone 11 pro',
  //     brandId: 1,
  //     brand: new Brand(),
  //     price: 300000
  //   },
  //   {
  //     id: 3,
  //     model: 'Samsung S 10',
  //     brandId: 2,
  //     brand: new Brand(),
  //     price: 80000
  //   },
  //   {
  //     id: 4,
  //     model: 'Iphone x max',
  //     brandId: 2,
  //     brand: new Brand(),
  //     price: 300000
  //   }
  // ]
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('/api/products')
  }
}
