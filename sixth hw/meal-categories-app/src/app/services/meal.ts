import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  constructor(private http: HttpClient) {}


  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getById(id: string) {
    return this.getAll().pipe(
      map(d => (d.categories || []).find((x:any) => String(x.idCategory) === String(id)))
    );
  }
}
// сделать динамичным
// лично отображалась еда
//
