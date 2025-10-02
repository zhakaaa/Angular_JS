import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {MealService} from '../services/meal';
import {HttpClient} from '@angular/common/http';
import {NgForOf} from '@angular/common';
import {NgxStarsModule} from 'ngx-stars';
import {Search} from '../search/search';

@Component({
  selector: 'app-food-page',
  imports: [
    RouterLink,
    NgForOf,
    NgxStarsModule,
    Search
  ],
  templateUrl: './food-page.html',
  styleUrls: ['./food-page.css']
})
export class FoodPage implements OnInit {
  meal: any | null = null;
  // error: string | null = null;
  favoriteIds: string[] = [];

  constructor(private route: ActivatedRoute, private mealService: MealService) {}

  ngOnInit(): void {
    const fromState = history.state?.meal;
    if (fromState?.idCategory) {
      this.meal = fromState;
      return;
    }
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        return;
      }

      this.mealService.getById(id).subscribe({
        next: (item) => {
          this.meal = item || null;

        },
      });
    });
  }

  toggleFavorite(meal: any) {
    meal.isFavorite = !meal.isFavorite;
    if (meal.isFavorite) {
      this.favoriteIds.push(meal.idCategory);
    } else {
      this.favoriteIds = this.favoriteIds.filter(id => id !== meal.idCategory);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favoriteIds));  // превращает объект/массив в строку.
  }
}
