import { createReducer, on } from '@ngrx/store';
import { Item } from '../../item-list/models/item.model';
import * as ItemActions from './items.actions';

export interface ItemsState {
  items: Item[];                   // List of items
  selectedItem: Item | null;        // Currently selected item
  loadingList: boolean;            // Loading flag for the list of items
  loadingItem: boolean;            // Loading flag for the single item
  errorList: string | null;        // Error field for the list of items
  errorItem: string | null;        // Error field for the single item
}

export const initialState: ItemsState = {
  items: [],
  selectedItem: null,
  loadingList: false,
  loadingItem: false,
  errorList: null,
  errorItem: null,
};

// Reducer function
export const itemsReducer = createReducer(
  initialState,

  // Load items actions
  on(ItemActions.loadItems, state => ({
    ...state,
    loadingList: true,
    errorList: null,  // Clear previous errors
  })),
  on(ItemActions.loadItemsSuccess, (state, { items }) => ({
    ...state,
    loadingList: false,
    items,  // Set the loaded items
  })),
  on(ItemActions.loadItemsFailure, (state, { error }) => ({
    ...state,
    loadingList: false,
    errorList: error,  // Set the error message
  })),

  // Load single item actions
  on(ItemActions.loadItem, state => ({
    ...state,
    loadingItem: true,
    errorItem: null,  // Clear previous errors
  })),
  on(ItemActions.loadItemSuccess, (state, { item }) => ({
    ...state,
    loadingItem: false,
    selectedItem: item,  // Set the selected item
  })),
  on(ItemActions.loadItemFailure, (state, { error }) => ({
    ...state,
    loadingItem: false,
    errorItem: error,  // Set the error message
  }))
);
