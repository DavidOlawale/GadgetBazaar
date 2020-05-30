import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { fade } from '../../animations/fade.amination';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    fade
  ]
})
export class LoginComponent implements OnInit {
  loginSuccess: boolean = true
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  async onSubmit(data: NgForm) {
    var success = await this.auth.logIn(data.value.email, data.value.password)
    if (!success) {
      this.loginSuccess = false
    }
  }

}
