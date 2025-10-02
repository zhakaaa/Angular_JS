import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../services/character.service';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: 'home.html',
  styleUrl: 'home.css'
})
export class HomeComponent implements OnInit {
  characters: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.characterService.getCharacters().subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.characters = response.results || response;  // Rick & Morty returns {results: [...]}
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = 'Failed to load characters';
        this.isLoading = false;
      }
    });
  }
}
