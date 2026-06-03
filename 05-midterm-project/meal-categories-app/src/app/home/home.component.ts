import {Component, HostListener, OnInit} from '@angular/core';
import { MealService } from '../services/meal';
import { CommonModule } from '@angular/common';
import { NgxStarsModule } from 'ngx-stars';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Search } from '../search/search';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxStarsModule, Search, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  meals: any[] = [];
  allMeals: any[] = [];
  favoriteIds: string[] = [];

  constructor(private mealService: MealService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.loadFavorites();

    this.mealService.getAll().subscribe(data => {
      this.allMeals = data.categories.map((meal: any) => ({
        ...meal, // копируем и храним всю еду в allMeals
        rating: +(Math.random() * 2 + 3).toFixed(1),
        cookTime: Math.floor(Math.random() * 50) + 10,
        price: (Math.random() * 40 + 10).toFixed(2),
        isFavorite: this.favoriteIds.includes(meal.idCategory)
      }));

      // оказывается важен использовать queryParams
      // и еще startWith
      this.route.queryParams.subscribe(params => {
        const term = (params['searchTerm'] || '').toLowerCase().trim();

        if (term) {
          this.meals = this.allMeals.filter(meal =>
            meal.strCategory.toLowerCase().startsWith(term)
          );
        } else {
          this.meals = this.allMeals;
        }
      });
    });
  }

  openMeal(event: Event, meal: any) {
    event.preventDefault();
    this.router.navigate(['/food', meal.idCategory], { state: { meal } });
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

  loadFavorites() {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      this.favoriteIds = JSON.parse(stored); //превращает строку в объект/массив.
    }
  }

  isScrolled = false;
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 250;
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
