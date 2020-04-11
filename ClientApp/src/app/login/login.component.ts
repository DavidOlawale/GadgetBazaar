import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  onSubmit(data: NgForm) {
    this.auth.login(data.value.email, data.value.password)
  }

}
