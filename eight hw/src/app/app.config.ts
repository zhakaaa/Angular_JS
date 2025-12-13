import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {environment} from '../environments/environment';

import {provideStore, StoreModule} from '@ngrx/store';
import {EffectsModule, provideEffects} from '@ngrx/effects';
import { ItemsEffects } from './items/state/items.effects';
import {provideStoreDevtools, StoreDevtoolsModule} from '@ngrx/store-devtools';
import {itemsReducer} from './items/state/items.reducer';


import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),

    provideEffects(ItemsEffects),
    provideStore({items: itemsReducer}),
    provideStoreDevtools(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),

  ],
};
