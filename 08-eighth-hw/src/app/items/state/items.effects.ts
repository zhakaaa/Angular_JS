import { inject, Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of, tap} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ItemsService } from '../../services/items';  // Your service
import * as ItemActions from './items.actions';   // Actions
import { Item } from '../../item-list/models/item.model';

@Injectable()
export class ItemsEffects {
  private actions$ = inject(Actions);
  private itemsService = inject(ItemsService);

  // Effect to load a list of items (loadItems action)
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.loadItems),
      mergeMap(action =>
        this.itemsService.getItems(action.query, action.page).pipe(
          map(items => ItemActions.loadItemsSuccess({ items })),
          catchError(error => of(ItemActions.loadItemsFailure({ error })))
        )
      )
    )
  );

  // Effect to load a single item by id (loadItem action)
  loadItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.loadItem),
      mergeMap(action =>
        this.itemsService.getItemById(action.id).pipe(
          map(item => ItemActions.loadItemSuccess({ item })),
          catchError(error => of(ItemActions.loadItemFailure({ error })))
        )
      )
    )
  );
}
