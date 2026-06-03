import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, map, pipe, forkJoin } from 'rxjs';
import {Item} from '../item-list/models/item.model';

interface OmdbSearchItem {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface OmdbSearchResponse {
  Search?: OmdbSearchItem[];
  totalResults?: string;
  Response?: 'True' | 'False';
  Error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey = 'c58cb411';
  private defaultMovieIds: string[] = [
    'tt0111161', // The Shawshank Redemption
    'tt0068646', // The Godfather
    'tt0468569', // The Dark Knight
    'tt0133093', // The Matrix
    'tt1375666', // Inception
    'tt0109830', // Forrest Gump
    'tt0120737', // The Lord of the Rings: The Fellowship of the Ring
    'tt0816692', // Interstellar
  ];

  // private pageSize = 12;

  constructor(private http: HttpClient) { }

  getDefaultItems(): Observable<Item[]> {
    const requests = this.defaultMovieIds.map((id) => this.getItemById(id));
    return forkJoin(requests);
  }

  getItems(query?: string, page: number =1): Observable<Item[]> {
    const effectiveQuery = query && query.trim().length > 0 ? query.trim() : 'Avengers' ;

    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('s', effectiveQuery)
      .set('page', page.toString());

    const trimmed = (query ?? '').trim();

    // If no search term – return default movie list instead of Avengers/empty
    if (!trimmed) {
      return this.getDefaultItems();
    }


    return this.http.get<OmdbSearchResponse>(this.apiUrl, { params }).pipe(
      map((res) => {
        if (res.Response === 'False' || !res.Search) {
          return [];
        }

        return res.Search.map((movie) => {
          const item: Item = {
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            type: movie.Type,
            poster: movie.Poster,
          };
          return item;
        });
      })
    );
  }

  getItemById(id: string | number): Observable<Item> {
    // return this.http.get<Item>(`${this.apiUrl}?id=${id}`);

    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('i', String(id))
      .set('plot', 'full');

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map((raw) => {
        const item: Item = {
          id: raw.imdbID,
          title: raw.Title,
          year: raw.Year,
          type: raw.Type,
          poster: raw.Poster,
          plot: raw.Plot,
          genre: raw.Genre,
          director: raw.Director,
          actors: raw.Actors,
          imdbRating: raw.imdbRating,
          runtime: raw.Runtime,
        };
        return item;
      })
    );
  }

}

