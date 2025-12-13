import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Item} from '../item-list/models/item.model';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  @Input() item!: Item;

  get posterUrl(): string {
    if(!this.item.poster || this.item.poster === 'N/A'){
      return 'https://via.placeholder.com/300x450?text=No+Image';
    }
    return this.item.poster;
  }

}
