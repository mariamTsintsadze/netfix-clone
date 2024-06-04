import { Injectable } from '@angular/core';
import { IVideoContent } from '../models/video-content.interface';
import { GenrePricingService } from './genre-pricing.service';
import { BehaviorSubject,Observable } from 'rxjs';
// import { LocalStorage } from '@ngx-pwa/local-storage';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private items: IVideoContent[] = [];

  constructor(private genrePricingService: GenrePricingService) {}

  addItem(item: IVideoContent) {
    if(!this.items.includes(item)){
      this.items.push(item);
      console.log('Item added to cart:', item);

  }
}

  getItems(): IVideoContent[] {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  isInCart(movie: any): boolean {
    return this.items.some(item => item.id === movie.id);
  }
  
  removeItem(movie: IVideoContent) {
    this.items = this.items.filter(item => item.id !== movie.id);
  }

  getTotalPrice(): number {
    return this.items.reduce((total, movie) => {
      const genreId = movie.genre_ids[0]; // Assuming the first genre is the primary one
      return total + this.genrePricingService.getGenrePrice(genreId);
    }, 0);
  }

  // isMoviePurchased(movieId: string): Observable<boolean> {
  //   return this.localStorage.getItem('purchasedMovies').pipe(
  //     map((purchasedMovies: string[]) => purchasedMovies && purchasedMovies.includes(movieId))
  //   );
  // }
  
  
}
