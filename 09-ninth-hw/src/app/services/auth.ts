import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { Observable, from, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Observable that emits the current Firebase user (or null if logged out)
  currentUser$: Observable<User | null>;

  constructor(private auth: Auth) {
    // authState() gives us a stream of User | null
    this.currentUser$ = authState(this.auth);
  }


  signup(email: string, password: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map((credential) => credential.user),
      catchError((error) => {
        const message = this.mapFirebaseError(error);
        return throwError(() => new Error(message));
      })
    );
  }


  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((credential) => credential.user),
      catchError((error) => {
        const message = this.mapFirebaseError(error);
        return throwError(() => new Error(message));
      })
    );
  }


  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      catchError((error) => {
        const message = this.mapFirebaseError(error);
        return throwError(() => new Error(message));
      })
    );
  }

  private mapFirebaseError(error: any): string {
    const code = error?.code as string | undefined;

    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/weak-password':
        return 'Password is too weak. It should be at least 8 characters.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Incorrect email or password.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'Authentication error. Please try again.';
    }
  }
}
