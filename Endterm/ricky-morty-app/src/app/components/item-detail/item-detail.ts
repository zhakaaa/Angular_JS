import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { Character } from '../item-list/models/character';
import {FavoritesService} from '../../services/favorites.service';
import {combineLatest} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'item-detail.html',
  styleUrl: 'item-detail.css'
})
export class ItemDetailsComponent implements OnInit {
  character: Character | null = null;
  isLoading = true;
  isFavorite = false;
  errorMessage = '';
  currentUserId?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private favService: FavoritesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.errorMessage = 'Invalid character ID';
      this.isLoading = false;
      return;
    }

    const charId = +idParam;

    // Комбинируем два Observable: пользователь + персонаж
    combineLatest([
      this.authService.user$,
      this.characterService.getCharacterById(charId),
      this.favService.favorites$ // ← Слушаем изменения избранных
    ]).subscribe({
      next: ([user, character, favorites]) => {
        this.currentUserId = user?.uid;
        this.character = character;
        this.isFavorite = favorites.includes(charId); // ← Проверяем статус
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = 'Character not found';
        this.isLoading = false;
      }
    });
  }

  toggleFavorite(): void {
    if (!this.character) return;

    if (this.isFavorite) {
      this.favService.removeFromFavorites(this.character.id);
    } else {
      this.favService.addToFavorites(this.character.id);
    }
  }

  goBack(): void {
    this.router.navigate(['/characters']);
  }

}
