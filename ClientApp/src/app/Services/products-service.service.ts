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
  constructor(private server: ServerService) {
  }

  getProducts(): Observable<Product[]>{
    return this.server.get('/products')
  }
}
