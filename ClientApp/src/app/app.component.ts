import { Component, ViewEncapsulation } from '@angular/core';
import { trigger, transition, animate, state, style } from '@angular/animations';
import { fade } from './animations/fade.amination';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app';
}
