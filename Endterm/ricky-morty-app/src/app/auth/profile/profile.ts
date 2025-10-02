import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { User } from '@angular/fire/auth';

import {AuthService} from '../../services/auth.service';
import {FavoritesService} from '../../services/favorites.service';
import {CharacterService} from '../../services/character.service';
import {Character} from '../../components/item-list/models/character';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'profile.html',
  styleUrl: 'profile.css',
})
export class ProfileComponent implements OnInit {
  currentUser: any = null;
  userProfile: any = null;
  isLoading = true;
  isUploading = false;
  uploadProgress = '';
  favoriteCharacters: Character[] = [];
  constructor(public auth: AuthService,
              private router: Router,
              private favService: FavoritesService,
              private charService: CharacterService) {}

  ngOnInit(): void {
    console.log('🔄 Profile component initialized');

    this.auth.user$.subscribe(async user => {
      if (user) {
        this.currentUser = user;
        console.log('👤 Current user:', user.email);

        // Загружаем профиль из Firestore
        this.userProfile = await this.auth.getUserProfile(user.uid);
        console.log('📋 User profile:', this.userProfile);

        // Загружаем избранных персонажей
        // this.loadFavoriteCharacters();

        this.isLoading = false;
      } else {
        console.log('⚠️ No user logged in, redirecting...');
        this.router.navigate(['/login']);
      }
    });
  }



  handleImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      console.log('⚠️ No file selected');
      return;
    }

    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      alert('Only .jpg and .png files are allowed!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB!');
      return;
    }

    if (!this.currentUser) {
      alert('You must be logged in to upload an avatar!');
      return;
    }

    console.log('📤 Starting upload process for:', file.name);
    this.isUploading = true;
    this.uploadProgress = 'Compressing image...';

    if (typeof Worker !== 'undefined') {
      // Используем Web Worker для сжатия
      const worker = new Worker(new URL('../../app.worker.ts', import.meta.url));

      worker.onmessage = async ({ data }) => {
        console.log('✅ Worker finished, received data');

        if (data.error) {
          console.error('❌ Worker error:', data.error);
          alert('Failed to process image: ' + data.error);
          this.isUploading = false;
          this.uploadProgress = '';
          return;
        }

        try {
          this.uploadProgress = 'Uploading to Firebase...';
          const url = await this.auth.uploadAvatar(data, this.currentUser.uid);

          // Обновляем локальный профиль
          if (this.userProfile) {
            this.userProfile.photoURL = url;
          }

          this.uploadProgress = 'Upload complete!';
          console.log('✅ Avatar uploaded successfully:', url);

          setTimeout(() => {
            this.isUploading = false;
            this.uploadProgress = '';
          }, 2000);
        } catch (error) {
          console.error('❌ Upload error:', error);
          alert('Failed to upload avatar. Please try again.');
          this.isUploading = false;
          this.uploadProgress = '';
        }
      };

      worker.onerror = (error) => {
        console.error('❌ Worker error:', error);
        alert('Failed to process image');
        this.isUploading = false;
        this.uploadProgress = '';
      };

      worker.postMessage(file);
    } else {
      alert('Web Workers are not supported in your browser');
      this.isUploading = false;
    }
  }

  async handleLogout(): Promise<void> {
    try {
      await this.auth.logout();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.log('⚠️ Failed to load avatar, using fallback');
    // Устанавливаем fallback изображение
    img.src = 'https://ui-avatars.com/api/?name=' +
      (this.currentUser?.email || 'User') +
      '&size=200&background=667eea&color=fff';
  }
}
