import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule} from '@angular/common';

import { AuthService} from '../../services/auth';
import { Observable } from 'rxjs';
import {User} from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  currentUser$: Observable<User | null> | undefined ;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to auth state
    this.currentUser$ = this.authService.currentUser$;
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
      },
      error: (err) => {
        console.error('Error during logout', err);
      },
    });
  }

}
