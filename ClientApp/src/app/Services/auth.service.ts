import { Injectable, EventEmitter } from '@angular/core';
import { ServerService } from './server.service';
import * as jwt from 'jwt-decode'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private role: string
  public email: string
  public isLoggedIn: boolean
  public alterLogin: EventEmitter<any> = new EventEmitter<any>()

  constructor(private server: ServerService, private router: Router) {
    let token = localStorage.getItem('token')
    if (token) {
      server.token = token
      let UserClaims = jwt(token)
      this.role = UserClaims.role
      this.email = UserClaims.email
      this.isLoggedIn = true
    }
  }

  async logIn(email: string, password: string) {
    var result = await this.server.post<string>('/identity/login', { username: email, password: password }).toPromise()
    localStorage.setItem('token', result.token)
    this.server.token = result.token
    let decripted = jwt(result.token)
    this.email = decripted.email
    this.role = decripted.role
    this.isLoggedIn = true
    this.alterLogin.emit()
    this.router.navigateByUrl('/')
  }

  logOut() {
    localStorage.removeItem('token')
    delete this.server.token
    this.isLoggedIn = false
    this.alterLogin.emit()
  }

  get isAdmin(): boolean {
    return this.role == "Admin"
  }

  get isCustomer() {
    return this.role == "Customer"
  }
}
