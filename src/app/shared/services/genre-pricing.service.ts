import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenrePricingService {
  private genrePrices: { [key: number]: number } = {
    28: 15, // Action
    12: 12, // Adventure
    16: 10, // Animation
    35: 8,  // Comedy
    80: 10, // Crime
    99: 7,  // Documentary
    18: 10, // Drama
    10751: 9, // Family
    14: 11, // Fantasy
    36: 12, // History
    27: 14, // Horror
    10402: 10, // Music
    9648: 12, // Mystery
    10749: 8, // Romance
    878: 13, // Science Fiction
    10770: 9, // TV Movie
    53: 12, // Thriller
    10752: 10, // War
    37: 11  // Western
  };

  getGenrePrice(genreId: number): number {
    return this.genrePrices[genreId] || 10; // Default price if genre not found
  }
}
