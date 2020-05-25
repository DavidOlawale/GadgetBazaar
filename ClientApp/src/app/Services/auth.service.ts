import { Injectable, EventEmitter } from '@angular/core';
import { ServerService } from './server.service';
import * as jwt from 'jwt-decode'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logInAction, logOutAction } from '../Store/Actions/nav-menu.actions';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public customerId: string
  private role: string
  public email: string
  public isLogedIn: boolean = false

  constructor(private server: ServerService,
    private router: Router,
    private store: Store<{ NavMenu: { logedIn: boolean, email: string } }>
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
        this.store.dispatch(logInAction({ email: this.email }))
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
      return false
    localStorage.setItem('token', result.token)
    this.server.token = result.token
    let decripted = jwt(result.token)
    this.email = decripted.email
    this.role = decripted.role
    this.router.navigateByUrl('/')
    this.isLogedIn = true
    this.store.dispatch(logInAction({ email: this.email }))
    return true
  }

  logOut() {
    localStorage.removeItem('token')
    delete this.server.token
    this.role = null;
    this.email = null;
    this.customerId = null
    this.router.navigateByUrl('/')
    this.isLogedIn = false
    this.store.dispatch(logOutAction())
  }

  get isAdmin(): boolean {
    return this.role == "Admin"
  }

  get isCustomer() {
    return this.role == "Customer"
  }
}
