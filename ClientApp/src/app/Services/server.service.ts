import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private router: string
  public token: string
  private origin: string = location.origin

  constructor(private http: HttpClient, router: Router) {
    this.router = location.origin
  }
  get(uri: string): Observable<any> {
    return this.http.get(this.origin + uri, {
      headers: this.token ? {"Authentication": `Bearer ${this.token}`} : null
    })
  }

  post(uri: string, data: any): Observable<any> {
    return this.http.post(this.origin + uri, data, {
      headers: this.token ? { "Authentication": `Bearer ${this.token}` } : null
    })
  }

  put(uri: string, data: any): Observable<any> {
    return this.http.put(this.origin + uri, data, {
      headers: this.token ? { "Authentication": `Bearer ${this.token}` } : null
    })
  }

  delete(uri: string): Observable<any> {
    return this.http.delete(this.origin + uri, {
      headers: this.token ? { "Authentication": `Bearer ${this.token}` } : null
    })
  }

}
