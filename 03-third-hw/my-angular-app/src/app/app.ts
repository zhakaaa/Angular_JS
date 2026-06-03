import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AboutMeComponent} from './about-me/about-me.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AboutMeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
}
