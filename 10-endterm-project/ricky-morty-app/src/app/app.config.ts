import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { ServiceWorkerModule } from '@angular/service-worker';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Core providers
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),

    // FIREBASE PROVIDERS - правильный порядок
    provideFirebaseApp(() => {
      const app = initializeApp(environment.firebase);
      console.log('Firebase initialized:', app.name); // для отладки
      return app;
    }),
    provideAuth(() => {
      const auth = getAuth();
      console.log('Auth initialized'); // для отладки
      return auth;
    }),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

    // Service Worker
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ]
};
