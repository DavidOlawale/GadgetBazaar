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
  public isLogedIn: boolean = false
  public LogedIn = new EventEmitter<any>()
  public logedOut = new EventEmitter<any>()

  constructor(private server: ServerService,
    private router: Router,
  ) {
    let token = localStorage.getItem('token')
    if (token) {
      server.token = token
      let userClaims = jwt(token)
      this.isLogedIn = new Date(0).setUTCSeconds(userClaims.exp) > Date.now()
      if (this.isLogedIn) {
        this.customerId = userClaims.nameid
        this.role = userClaims.role
        this.email = userClaims.email
      }
    }
  }

  signUp(signUpData) {
    this.server.post<string>('/identity/signup', signUpData).subscribe(
      result => {
        localStorage.setItem('token', result.token)
        this.server.token = result.token
        let decripted = jwt(result.token)
        this.email = decripted.email
        this.role = decripted.role
        this.isLogedIn = true
        this.LogedIn.emit()
        this.router.navigateByUrl('/')
      },
        error => {
          
        })
  }

  async logIn(email: string, password: string): Promise<boolean> {
    try {
      var result = await this.server.post<string>('/identity/login', { username: email, password: password }).toPromise()
    } catch (e) {
      return false
    }

    if (!result.success)
      return false
    localStorage.setItem('token', result.token)
    this.server.token = result.token
    let decripted = jwt(result.token)
    this.email = decripted.email
    this.role = decripted.role
    this.isLogedIn = true
    this.LogedIn.emit()
    return true
  }

  logOut() {
    localStorage.removeItem('token')
    delete this.server.token
    this.role = null;
    this.email = null;
    this.customerId = null
    this.isLogedIn = false
    this.logedOut.emit()
    this.router.navigateByUrl('/')
  }

  public get isAdmin(): boolean {
    return this.role == "Admin"
  }

  public get isCustomer() {
    return this.role == "Customer"
  }
}
