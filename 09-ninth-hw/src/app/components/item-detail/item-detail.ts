import { Component , OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Item} from '../../item-list/models/item.model';
import {ItemsService} from '../../services/items';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import { Observable, of } from 'rxjs';

import { Store } from '@ngrx/store';
import * as ItemSelectors from '../../items/state/items.selectors';
import * as ItemActions from '../../items/state/items.actions';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.css',
})
export class ItemDetail {

  item$: Observable<Item | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;


  // item: Item | null = null;
  // loading = false;
  // error: string | null = null;

  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private itemService: ItemsService,
    private location: Location,
  ) {
    this.item$ = this.store.select(ItemSelectors.selectSelectedItem);
    this.loading$ = this.store.select(ItemSelectors.selectLoadingList);
    this.error$ = this.store.select(ItemSelectors.selectErrorList);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      const id = params.get('id');

      if(!id){
        // this.error = 'Invalid item id';
        this.error$ = of('Invalid item id');
        return;
      }

      this.fetchItem(id);
    });
  }

  fetchItem(id:string){
    this.store.dispatch(ItemActions.loadItem({ id }));
  }

  goBack(): void {
    this.location.back();

    // Альтернатива:
    // this.router.navigateByUrl('/items');
  }
}
