import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['searchTerm'] !== undefined) {
        this.searchTerm = params['searchTerm'];
      } else {
        this.searchTerm = '';
      }
    });

    this.searchSubject.pipe(
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe(term => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { searchTerm: term || null },
        queryParamsHandling: 'merge'
      });
    });
  }

  onSearchChange(term: string) {
    this.searchSubject.next(term.trim());
  }

  search(): void {
    this.searchSubject.next(this.searchTerm.trim());
  }
}

