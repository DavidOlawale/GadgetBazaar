import { Injectable, EventEmitter } from '@angular/core';
import { ServerService } from './server.service';
import * as jwt from 'jwt-decode'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public customerId: string
  private role: string
  public email: string
  public isLoggedIn: boolean = false
  public alterLogin: EventEmitter<any> = new EventEmitter<any>()

  constructor(private server: ServerService, private router: Router) {
    let token = localStorage.getItem('token')
    if (token) {
      server.token = token
      let userClaims = jwt(token)
      this.isLoggedIn = new Date(0).setUTCSeconds(userClaims.exp) > Date.now()
      if (this.isLoggedIn) {
        this.customerId = userClaims.nameid
        this.role = userClaims.role
        this.email = userClaims.email
      }
    }
  }

  async logIn(email: string, password: string): Promise<boolean> {

    try {
      var result = await this.server.post<string>('/identity/login', { username: email, password: password }).toPromise()
    } catch (e) {
      return false
    }

    if (!result.success)
    localStorage.setItem('token', result.token)
    this.server.token = result.token
    let decripted = jwt(result.token)
    this.email = decripted.email
    this.role = decripted.role
    this.isLoggedIn = true
    this.alterLogin.emit(true)
    this.router.navigateByUrl('/')
    return true
  }

  logOut() {
    localStorage.removeItem('token')
    delete this.server.token
    this.router.navigate(['/'])
    this.isLoggedIn = false
    this.alterLogin.emit(false)
  }

  get isAdmin(): boolean {
    return this.role == "Admin"
  }

  get isCustomer() {
    return this.role == "Customer"
  }
}
