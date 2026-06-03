import {Component, OnDestroy, OnInit} from '@angular/core';

import { CharacterService } from '../../services/character.service';
import { Character} from '../item-list/models/character';
import {combineLatest, forkJoin, from, of, Subscription} from 'rxjs';
import {FavoritesService} from '../../services/favorites.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [
    RouterLink
],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit, OnDestroy  {
  favorites: Character[] = [];
  isLoading = true;
  private favSubscription?: Subscription;

  constructor(
    private charService: CharacterService,
    private favService: FavoritesService
  ) {}

  ngOnInit() {
    console.log('🔄 Favorites component initialized');

    // Загружаем избранные сразу
    this.loadFavorites();

    // Подписываемся на изменения
    this.favSubscription = this.favService.favorites$.subscribe(() => {
      console.log('🔔 Favorites changed, reloading...');
      this.loadFavorites();
    });
  }

  ngOnDestroy(): void {
    this.favSubscription?.unsubscribe();
  }

  loadFavorites(): void {
    const favIds = this.favService.getCurrentFavorites();
    console.log('🎯 Loading favorites, IDs:', favIds);

    if (favIds.length === 0) {
      this.favorites = [];
      this.isLoading = false;
      console.log('📭 No favorites to load');
      return;
    }

    this.isLoading = true;

    // Загружаем детали всех персонажей параллельно
    const requests = favIds.map(id => this.charService.getCharacterById(id));

    forkJoin(requests).subscribe({ // Ждет все запросы
      next: (characters: Character[]) => {
        this.favorites = characters.filter(c => c !== null && c !== undefined);
        this.isLoading = false;
        console.log('✅ Loaded favorites:', this.favorites);
      },
      error: (err) => {
        console.error('❌ Error loading favorites:', err);
        this.favorites = [];
        this.isLoading = false;
      }
    });
  }

  removeFromFavorites(charId: number, event?: Event): void {
    if (event) {
      event.stopPropagation(); // Останавливаем событие, чтобы не сработал клик на карточку
      event.preventDefault();
    }

    console.log('🗑️ Removing character:', charId);
    this.favService.removeFromFavorites(charId);
    // Список обновится автоматически через подписку
  }

  clearAllFavorites(): void {
    if (confirm('Are you sure you want to remove all favorites?')) {
      this.favService.clearFavorites();
      // Список обновится автоматически через подписку
    }
  }

  navigateToDetails(charId: number): void {
    console.log('🔗 Navigating to character:', charId);
  }
}
