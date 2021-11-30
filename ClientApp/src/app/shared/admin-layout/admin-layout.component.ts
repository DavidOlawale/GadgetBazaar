import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  isExpanded = false;
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  toggle() {
    this.isExpanded = !this.isExpanded
  }

}
