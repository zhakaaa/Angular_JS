import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState } from './items.reducer';

// Select the feature state (ItemsState)
export const selectItemsState = createFeatureSelector<ItemsState>('items');

// Select the list of items
export const selectAllItems = createSelector(
  selectItemsState,
  (state: ItemsState) => state.items
);

// Select the loading state for the items list
export const selectLoadingList = createSelector(
  selectItemsState,
  (state: ItemsState) => state.loadingList
);

// Select the error state for the items list
export const selectErrorList = createSelector(
  selectItemsState,
  (state: ItemsState) => state.errorList
);

// Select the selected item (the item details)
export const selectSelectedItem = createSelector(
  selectItemsState,
  (state: ItemsState) => state.selectedItem
);

// Select the loading state for the selected item
export const selectLoadingItem = createSelector(
  selectItemsState,
  (state: ItemsState) => state.loadingItem
);

// Select the error state for the selected item
export const selectErrorItem = createSelector(
  selectItemsState,
  (state: ItemsState) => state.errorItem
);
