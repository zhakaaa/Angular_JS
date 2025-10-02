import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, HeaderComponent],
  styleUrl: 'app.component.css',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  // protected readonly title = signal('meal-categories-app');
}
