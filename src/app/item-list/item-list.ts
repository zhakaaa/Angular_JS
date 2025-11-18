import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {ItemsService} from '../services/items';
import {Item} from './models/item.model';
import {ItemCard} from '../item-card/item-card';


@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemCard],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList {
  items: Item[] = [];
  loading =  false;
  error: string | null = null;

  query = '';
  page = 1;

  constructor(
    private itemService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q') ?? '';
      this.page = Number(params.get('page') ?? '1');
      this.fetchItems();
    })
  }

  fetchItems(): void {
    this.loading = true;
    this.error = null;

    this.itemService.getItems(this.query, this.page).subscribe({
      next: (items) =>{
        this.items = items;
        this.loading = false;
      },
      error: (error)=>{
        console.error(error);
        this.error = "Failed to fetch items.";
        this.loading = false;
      },
    });
  }

  onSearch(): void{
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q: this.query || null,
        page:1,
      },
      queryParamsHandling: 'merge',
    });
  }
}
