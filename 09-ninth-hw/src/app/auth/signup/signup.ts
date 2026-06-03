import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {AuthService} from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: '/signup.html',
  styleUrl: 'signup.css',
})
export class SignupComponent {

  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error = null;

    if (!this.email || !this.password || !this.confirmPassword) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;

    this.authService.signup(this.email, this.password).subscribe({
      next: async (user) => {
        console.log('Signed up:', user);
        this.loading = false;
        await this.router.navigate(['/profile']);
      },
      error: (err: Error) => {
        console.error(err);
        this.error = err.message;
        this.loading = false;
      },
    });
  }
}
