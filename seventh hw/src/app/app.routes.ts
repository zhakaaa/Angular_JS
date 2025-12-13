import { Routes } from '@angular/router';

import {Home} from './components/home/home';
import {About} from './components/about/about';
import {ItemDetail} from './components/item-detail/item-detail';
import {ItemList} from './item-list/item-list';

import {Login} from './auth/login/login';
import {SignupComponent} from './auth/signup/signup';
import {ProfileComponent} from './auth/profile/profile';
import {authGuard} from './auth/auth-guard';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'about', component: About},
  {path: 'items', component: ItemList},
  {path: 'items/:id', component: ItemDetail},

  { path: 'login', component: Login},
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },

  {path: '**', component: Home} // unknown -> Home
];
