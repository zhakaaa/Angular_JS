import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, BehaviorSubject, tap, of} from 'rxjs';
import { ApiResponse, Character } from '../components/item-list/models/character'

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private characterCache = new BehaviorSubject<ApiResponse | null>(null);
  public characters$ = this.characterCache.asObservable();
  constructor(private http: HttpClient) {}

  // Получить всех персонажей (с пагинацией)
  getCharacters(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }

  searchCharacters(name: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}?name=${name}&page=${page}`);
  }

  // Детали одного персонажа
  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }
}
