import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private STORAGE_KEY = 'favs';
  private favoritesSubject = new BehaviorSubject<number[]>([]);
  public favorites$: Observable<number[]> = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  // загрузжаем избранное из localStorage
  private loadFavorites(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const favorites = stored ? JSON.parse(stored) : [];
    console.log('📥 Loaded favorites from localStorage:', favorites);
    this.favoritesSubject.next(favorites);
  }

  // сохраням в localStorage
  private saveFavorites(favorites: number[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    console.log('💾 Saved favorites to localStorage:', favorites);
    this.favoritesSubject.next(favorites);
  }

  // async saveFavorites(favs: number[]): Promise<void> {
  //   const userId = this.auth.currentUser.uid; // Получаем ID залогиненного пользователя
  //   const userRef = doc(this.firestore, `users/${userId}`);
  //
  //   try {
  //     await updateDoc(userRef, {
  //       favorites: favs // Обновляем поле 'favorites' в документе пользователя
  //     });
  //     console.log('✨ Firestore: Favorites saved successfully!'); // <-- ЭТОТ ЛОГ
  //   } catch (error) {
  //     console.error('❌ Firestore Error:', error);
  //   }
  // }

  // получаем текущие избранные
  getCurrentFavorites(): number[] {
    return this.favoritesSubject.value;
  }

  // добавляем в избранное
  addToFavorites(charId: number): void {
    const currentFavs = this.getCurrentFavorites();

    if (currentFavs.includes(charId)) {
      console.log('Character already in favorites');
      return;
    }

    const updatedFavs = [...currentFavs, charId];
    this.saveFavorites(updatedFavs);
    console.log('Added to favorites:', charId);
  }

  // удлаяем из избранного
  removeFromFavorites(charId: number): void {
    const currentFavs = this.getCurrentFavorites();
    const updatedFavs = currentFavs.filter(id => id !== charId);
    this.saveFavorites(updatedFavs);
    console.log('Removed from favorites:', charId);
  }

  // проверямем, находится ли в избранном
  isFavorite(charId: number): boolean {
    return this.getCurrentFavorites().includes(charId);
  }

  // Очистить все избранные
  clearFavorites(): void {
    this.saveFavorites([]);
    console.log('All favorites cleared');
  }
}
