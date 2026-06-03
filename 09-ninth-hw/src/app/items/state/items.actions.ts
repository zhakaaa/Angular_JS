import { createAction, props } from '@ngrx/store';
import { Item } from '../../item-list/models/item.model'

// 1. Load Items actions
export const loadItems = createAction(
  '[Items] Load Items',
  props<{ query: string; page: number}>()  // Optional query parameter for searching items
);

export const loadItemsSuccess = createAction(
  '[Items] Load Items Success',
  props<{ items: Item[] }>()
);

export const loadItemsFailure = createAction(
  '[Items] Load Items Failure',
  props<{ error: any }>()
);

// 2. Load Single Item actions
export const loadItem = createAction(
  '[Items] Load Item',
  props<{ id: string | number }>()  // ID of the item to load
);

export const loadItemSuccess = createAction(
  '[Items] Load Item Success',
  props<{ item: Item }>()
);

export const loadItemFailure = createAction(
  '[Items] Load Item Failure',
  props<{ error: any }>()
);
