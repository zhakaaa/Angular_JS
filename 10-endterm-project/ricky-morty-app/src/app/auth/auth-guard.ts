import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Observable, map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1), // берет только первые данные
    map(user => { // преобразует данные
      if (user) {
        console.log('✅ Auth Guard: User authenticated');
        return true;
      } else {
        console.log('⚠️ Auth Guard: Redirecting to login');
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
