import { Injectable } from '@angular/core';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceService {

  constructor(private server: ServerService) {

  }

  getProductImages(id: Number) {
    return this.server.get(`/products/${id}/photos`).toPromise()
  }

  postProductImage(id: Number, photo) {
    let formData = new FormData()
    formData.append('photo', photo)
    return this.server.post(`/products/${id}/photos`, formData ).toPromise()
  }
}
