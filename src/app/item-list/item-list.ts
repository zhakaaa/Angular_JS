import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {ItemsService} from '../services/items';
import {Item} from './models/item.model';
import {ItemCard} from '../components/item-card/item-card';

import {AuthService} from '../services/auth';
import {map, Observable} from 'rxjs';
import {User} from '@angular/fire/auth';

import { Store } from '@ngrx/store';
import * as ItemSelectors from '../../app/items/state/items.selectors';
import * as ItemActions from '../../app/items/state/items.actions';


@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemCard],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList  implements OnInit {
  items$: Observable<Item[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  query: string = '';
  page = 1;

  currentUser$: Observable<User | null> | undefined ;

  constructor(

    private authService: AuthService,

    private itemService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.items$ = this.store.select(ItemSelectors.selectAllItems)
    this.loading$ = this.store.select(ItemSelectors.selectLoadingList);
    this.error$ = this.store.select(ItemSelectors.selectErrorList);
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q') ?? '';
      this.page = Number(params.get('page') ?? '1');
      this.fetchItems();
    })
  }

  fetchItems(): void {
    this.store.dispatch(ItemActions.loadItems({ query: this.query, page: this.page  }));
  }

  onSearch(): void {
    this.onSearchChange(this.query);
  }

  onSearchChange(value: string): void {
    this.query = value;
    this.page = 1;
    this.fetchItems();
  }

}
