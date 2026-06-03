import { Routes } from '@angular/router';

import {HomeComponent} from './components/home/home';
import {ItemDetailsComponent} from './components/item-detail/item-detail';
import {ItemList} from './components/item-list/item-list';

import {Login} from './auth/login/login';
import {SignupComponent} from './auth/signup/signup';
import {ProfileComponent} from './auth/profile/profile';
import {Favorites} from './components/favorites/favorites';
import {authGuard} from './auth/auth-guard';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: Login },
  { path: 'signup', component: SignupComponent },

  // Эти страницы доступны всем
  { path: 'characters', component: ItemList },
  { path: 'characters/:id', component: ItemDetailsComponent },

  // Защищенные маршруты (только для login user)
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['login']) }
  },
  {
    path: 'favorites',
    component: Favorites,
    canActivate: [authGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['login'])
    }
  },

  { path: '**', redirectTo: '' }

];
