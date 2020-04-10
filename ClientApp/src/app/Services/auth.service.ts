import { Injectable } from '@angular/core';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private server: ServerService) {

  }

  async login(email: string, password: string) {
    var token = await this.server.post('/identity/login', { userName: email, password: password }).toPromise()
    localStorage.setItem('token', token)
    this.server.token = token
  }
}
