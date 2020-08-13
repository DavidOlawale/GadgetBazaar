import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fade } from '../../animations/fade.amination';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [fade]
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService) { }
  faSpinner = faSpinner
  isLoading = false

  private signUpForm: FormGroup

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'customer': new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null, Validators.required),
        'address': new FormControl(null, Validators.required),
      }),
      'password': new FormControl(null, Validators.required)
    })
  }


  onSubmit() {
    this.authService.signUp(this.signUpForm.value)
  }
}
