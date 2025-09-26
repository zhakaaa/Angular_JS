import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AboutMe} from './about-me/about-me';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AboutMe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
}
