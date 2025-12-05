import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from '../services/auth';
import { Observable, map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        // Redirect to login if not authenticated
        return router.createUrlTree(['/login']);
      }
    })
  );
};
