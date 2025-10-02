import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatLabel} from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  // email =  '';
  // password =  '';
  // hidePassword = true;
  //
  // loading = false;
  // error: string | null = null;
  //
  // ngOnInit() {
  //   console.log('*** LoginComponent INIT ***');
  // }
  //
  // constructor(private authService: AuthService, private router: Router) {}
  //
  // onSubmit() {
  //   if (!this.email || !this.password) {
  //     this.error = 'Please enter both email and password';
  //     return;
  //   }
  //
  //   this.loading = true;
  //   this.error = null;
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
  showPassword = false;

  constructor(private authService: AuthService, private router: Router  ) {}

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        console.log('Logged in successfully!');
        this.router.navigate(['/characters']); // ← Переход на страницу персонажей
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed! Check your credentials.');
      }
    });
  }
}
