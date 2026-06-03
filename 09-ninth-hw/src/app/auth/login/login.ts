import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

import {AuthService} from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  email =  '';
  password =  '';
  hidePassword = true;

  loading = false;
  error: string | null = null;

  ngOnInit() {
    console.log('*** LoginComponent INIT ***');
  }

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Please enter both email and password';
      return;
    }

    this.loading = true;
    this.error = null;

    this.authService.login(this.email, this.password).subscribe({
      next: async (user) => {
        console.log("Logged in: ", user);
        this.loading = false;

        await this.router.navigate(['/profile']);
      },
      error: (err: Error) => {
        console.error(err);
        this.error = err.message;
        this.loading = false;
      }
    })
  }
}
