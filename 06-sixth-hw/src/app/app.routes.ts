import { Routes } from '@angular/router';

import {Home} from './home/home';
import {About} from './about/about';
import {Login} from './login/login';
import {ItemDetail} from './item-detail/item-detail';
import {ItemList} from './item-list/item-list';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'about', component: About},
  {path: 'login', component: Login},
  {path: 'items', component: ItemList},
  {path: 'items/:id', component: ItemDetail},
  {path: '**', component: Home} // unknown -> Home
];
