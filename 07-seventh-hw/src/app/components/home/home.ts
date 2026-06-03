import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {AuthService} from '../../services/auth';
import {Observable} from 'rxjs';
import {User} from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  appName = 'Netflix';
  subtitle = 'A simple Netflix-like demo built with Angular.';

  currentUser$: Observable<User | null> | undefined ;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to auth state
    this.currentUser$ = this.authService.currentUser$;
  }
}
