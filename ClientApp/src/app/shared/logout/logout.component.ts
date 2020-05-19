import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthService) {
    auth.logOut()

  }

  ngOnInit() {
  }

}
