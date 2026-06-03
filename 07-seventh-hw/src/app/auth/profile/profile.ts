import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';

import {AuthService} from '../../services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'profile.html',
  styleUrl: 'profile.css',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  loading = true;
  error: string | null = null;
  logoutLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;

        // If not authenticated – redirect to /login
        if (!user) {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load user.';
        this.loading = false;
      },
    });
  }

  onLogout(): void {
    this.logoutLoading = true;
    this.authService.logout().subscribe({
      next: async () => {
        this.logoutLoading = false;
        await this.router.navigate(['/login']);
      },
      error: (err: Error) => {
        console.error(err);
        this.error = err.message;
        this.logoutLoading = false;
      },
    });
  }
}
