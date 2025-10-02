import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {Character} from './models/character';
import {CharacterService} from '../../services/character.service';
import {debounceTime, distinctUntilChanged, of, switchMap} from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule, ReactiveFormsModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList  implements OnInit {
  searchControl = new FormControl('');
  characters: Character[] = [];
  isLoading = true;
  errorMessage = '';

  currentPage = 1;
  totalPages = 1;
  pageSize = 20;

  constructor(
    private charService: CharacterService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    // Читаем query params (page и search)
    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['page'] || 1;
      const searchQuery = params['search'] || '';
      this.searchControl.setValue(searchQuery, { emitEvent: false });

      this.loadCharacters(this.currentPage, searchQuery);
    });

    // Динамический поиск
    this.searchControl.valueChanges.pipe(
      debounceTime(500), //ждем 500мс перед запросом
      distinctUntilChanged(), //игнорируем одинаковые значения
      switchMap(query => { //отменяем предыдущие запросы
        this.isLoading = true;
        // сбрасываем на первую страницу при поиске
        this.updateQueryParams(1, query || '');
        return of(null); // загрузка произойдет через queryParams
      })
    ).subscribe();
  }

  loadCharacters(page: number, search: string): void {
    this.isLoading = true;

    if (search) {
      // Поиск с пагинацией
      this.charService.searchCharacters(search, page).subscribe({
        next: (res) => {
          this.characters = res.results || [];
          this.totalPages = res.info?.pages || 1;
          this.isLoading = false;
        },
        error: (err) => { // Обрабатывает ошибки
          console.error('Search error:', err);
          this.errorMessage = 'No characters found';
          this.characters = [];
          this.isLoading = false;
        }
      });
    }
    else {
      // Обычная загрузка с пагинацией
      this.charService.getCharacters(page).subscribe({
        next: (res) => {
          this.characters = res.results;
          this.totalPages = res.info.pages;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading characters:', err);
          this.isLoading = false;
        }
      });
    }
  }

  updateQueryParams(page: number, search: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page, search: search || null },
      queryParamsHandling: 'merge'
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      const searchQuery = this.searchControl.value || '';
      this.updateQueryParams(this.currentPage + 1, searchQuery);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      const searchQuery = this.searchControl.value || '';
      this.updateQueryParams(this.currentPage - 1, searchQuery);
    }
  }

  goToPage(page: number): void {
    const searchQuery = this.searchControl.value || '';
    this.updateQueryParams(page, searchQuery);
  }

  get visiblePages(): number[] {
    const maxVisible = 5; // Максимальное количество видимых кнопок
    const pages: number[] = [];

    // Определяем начальную и конечную страницы
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisible - 1);

    // Корректируем начальную страницу, если мы в конце списка
    if (endPage === this.totalPages) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Заполняем массив номерами страниц
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

}
