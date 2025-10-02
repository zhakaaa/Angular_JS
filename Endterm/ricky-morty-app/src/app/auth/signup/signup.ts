import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: '/signup.html',
  styleUrl: 'signup.css',
})
export class SignupComponent {

  // email = '';
  // password = '';
  // confirmPassword = '';
  // loading = false;
  // error: string | null = null;
  //
  // constructor(
  //   private authService: AuthService,
  //   private router: Router
  // ) {}
  //
  // onSubmit(): void {
  //   this.error = null;
  //
  //   if (!this.email || !this.password || !this.confirmPassword) {
  //     this.error = 'Please fill in all fields';
  //     return;
  //   }
  //
  //   if (this.password !== this.confirmPassword) {
  //     this.error = 'Passwords do not match';
  //     return;
  //   }
  //
  //   this.loading = true;
  //
  //   this.authService.login(this.email, this.password).subscribe({
  //     next: async (user) => {
  //       console.log("Logged in: ", user);
  //       this.loading = false;
  //
  //       await this.router.navigate(['/profile']);
  //     },
  //     error: (err: Error) => {
  //       console.error(err);
  //       this.error = err.message;
  //       this.loading = false;
  //     }
  //   })
  // }

  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;

  emailError = '';
  passwordError = '';
  confirmPasswordError = '';


  constructor(private authService: AuthService, private router: Router ) {}

  validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email) {
      this.emailError = 'Email is required';
      return false;
    }
    if (!emailRegex.test(this.email)) {
      this.emailError = 'Please enter a valid email';
      return false;
    }
    this.emailError = '';
    return true;
  }

  // Валидация пароля (8+ символов, 1 спецсимвол, 1 цифра)
  validatePassword(): boolean {
    if (!this.password) {
      this.passwordError = 'Password is required';
      return false;
    }
    if (this.password.length < 8) {
      this.passwordError = 'Password must be at least 8 characters';
      return false;
    }
    if (!/[0-9]/.test(this.password)) {
      this.passwordError = 'Password must contain at least one number';
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.password)) {
      this.passwordError = 'Password must contain at least one special character';
      return false;
    }
    this.passwordError = '';
    return true;
  }

  // Проверка совпадения паролей
  validateConfirmPassword(): boolean {
    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Please confirm your password';
      return false;
    }
    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match';
      return false;
    }
    this.confirmPasswordError = '';
    return true;
  }

  onSignup() {
    // Валидируем все поля
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    const confirmPasswordValid = this.validateConfirmPassword();

    if (!emailValid || !passwordValid || !confirmPasswordValid) {
      console.log('❌ Validation failed');
      return;
    }

    console.log('✅ All validations passed, signing up...');

    this.authService.signup(this.email, this.password).then(() => {
      console.log('✅ Account created!');
      this.router.navigate(['/characters']);
    }).catch(err => {
      console.error('❌ Signup failed', err);
      alert('Signup failed: ' + err.message);
    });
  }
}
