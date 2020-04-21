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
  private headers = {
    "content-type": "application/json"
  }

  constructor(private http: HttpClient, router: Router) {
    this.token = localStorage.getItem('token')
  }
  get(uri: string): Observable<any> {
    if (this.token)
      this.headers['Authorization'] = `Bearer ${this.token}`

    return this.http.get(`${this.origin}/api${uri}`, {
      headers: this.token ? {"Authorization": `Bearer ${this.token}`} : null
    })
  }

  post<T>(uri: string, data: any): Observable<any> {
    if (this.token)
      this.headers['Authorization'] = `Bearer ${this.token}`
    return this.http.post<T>(`${this.origin}/api${uri}`, data, {
      headers: this.headers
    })
  }

  put(uri: string, data: any): Observable<any> {
    if (this.token)
      this.headers['Authorization'] = `Bearer ${this.token}`

    return this.http.put(`${this.origin}/api${uri}`, data, {
      headers: this.headers
    })
  }

  delete(uri: string): Observable<any> {
    if (this.token)
      this.headers['Authorization'] = `Bearer ${this.token}`

    return this.http.delete(`${this.origin}/api${uri}`, {
      headers: this.headers
    })
  }

}
