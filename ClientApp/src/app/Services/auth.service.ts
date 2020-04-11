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
  public loggedIn: EventEmitter<any>
  public loggedOut: EventEmitter<any>
  constructor(private server: ServerService, private router: Router) {

  }

  async login(email: string, password: string) {
    var result = await this.server.post<string>('/identity/login', { username: email, password: password }).toPromise()
    localStorage.setItem('token', result.token)
    this.server.token = result.token
    let decripted = jwt(result.token)
    this.email = decripted.email
    this.role = decripted.role
    this.loggedIn.emit()
    this.router.navigateByUrl('/')
  }
}
