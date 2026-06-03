import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private onlineStatus = new BehaviorSubject<boolean>(navigator.onLine);
  public onlineStatus$ = this.onlineStatus.asObservable();

  constructor() {
    // Слушаем события браузера о переходе в онлайн/офлайн
    fromEvent(window, 'online').subscribe(() => this.onlineStatus.next(true));
    fromEvent(window, 'offline').subscribe(() => this.onlineStatus.next(false));
  }
}
