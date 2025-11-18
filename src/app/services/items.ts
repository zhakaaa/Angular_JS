import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, map, pipe} from 'rxjs';
import {Item} from '../item-list/models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private apiUrl = 'https://dummyjson.com/products';
  private pageSize = 12;

  constructor(private http: HttpClient) { }

  getItems(query?: string, page: number =1): Observable<Item[]> {
    let params = new HttpParams()
      .set('limit', this.pageSize)
      .set('skip', ((page-1) * this.pageSize).toString());

    const url = query ? `${this.apiUrl}?/search` : this.apiUrl;

      if (query) {
        params =  params.set('q', query);
      }

    return this.http
      .get<{products: Item[]}>(url, {params})
      .pipe(map((res) => res.products));
  }

  getItemById(id: string | number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}?id=${id}`);
  }

}

