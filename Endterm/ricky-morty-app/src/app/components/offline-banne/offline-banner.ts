import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-offline-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'offline-banner.html',
  styleUrl: 'offline-banner.css',
})
export class OfflineBanner {
  constructor(public networkService: NetworkService) {
  }

  isOnline = true;

  ngOnInit() {
    // Проверяем статус онлайн/офлайн
    this.isOnline = navigator.onLine;

    // Слушаем изменения
    window.addEventListener('online', () => {
      console.log('✅ Back online');
      this.isOnline = true;
    });

    window.addEventListener('offline', () => {
      console.log('⚠️ Gone offline');
      this.isOnline = false;
    });
  }
}
