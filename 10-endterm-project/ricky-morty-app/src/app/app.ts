import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule} from '@angular/router';
import {AuthService} from './services/auth.service';
import {Navbar} from './components/navbar/navbar';
import {OfflineBanner} from './components/offline-banne/offline-banner';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, OfflineBanner, RouterModule],
  templateUrl: 'app.html',
  styleUrl: 'app.css'
})
export class App {
  protected readonly title = signal('restaraunt-app');
  protected readonly AuthService = AuthService;

  constructor(public auth: AuthService) {}
}
