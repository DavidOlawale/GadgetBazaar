import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { NgForm } from '@angular/forms';
import { fade } from '../../core/animations/fade.amination';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    fade
  ]
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  isLoginFailed: boolean = false
  faSpinner = faSpinner
  isLoading = false

  ngOnInit() {
  }
  async onSubmit(data: NgForm) {
    this.isLoading = true;
    this.isLoginFailed = false
    var success = await this.auth.logIn(data.value.email, data.value.password)

    setTimeout(() => {
      if (!success){
        this.isLoginFailed = true 
        this.isLoading = false
      } else {
        this.isLoginFailed = true
        this.isLoading = false

        if (this.auth.isAdmin) this.router.navigateByUrl('/admin/products')
        else this.router.navigateByUrl('/')
      }
        
      
    }, 2000)
    
  }

}
