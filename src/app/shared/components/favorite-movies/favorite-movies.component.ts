import { Component, Input,Output,EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IVideoContent } from '../../models/video-content.interface';
import { MovieCarouselComponent } from '../movie-carousel/movie-carousel.component';
// import { AddToFavoritesService } from '../../services/add-to-favorites.service';
import { MovieService } from '../../services/movie.service';
import { CartServiceService } from '../../services/cart.service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorite-movies',
  standalone: true,
  imports: [CommonModule,MovieCarouselComponent],
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss'],
})

export class FavoriteMoviesComponent {
  @Input() favoriteMovies: IVideoContent[]=[];
  movieService = inject(MovieService);
  cartService = inject(CartServiceService);
  @Output() favoriteMoviesChange = new EventEmitter<IVideoContent[]>();

  activeDropdownIndex: number = -1;
  toggleDropdown(index: number) {
    this.activeDropdownIndex = this.activeDropdownIndex === index ? -1 : index;
  }

  removeFromFavorites(movie: IVideoContent) {
    const index = this.favoriteMovies.findIndex(favMovie => favMovie.id === movie.id);
    if (index !== -1)  {
      this.favoriteMovies.splice(index, 1);
    }
    this.favoriteMoviesChange.emit(this.favoriteMovies);
    this.activeDropdownIndex = -1;
  }

  isMovieInCart(movie: IVideoContent): boolean {
    return this.cartService.isInCart(movie);
  }
  buyMovie(movie: IVideoContent): void {
    if (this.cartService.isInCart(movie)) {
      // alert('This movie is already in your cart!');
      Swal.fire({
        text: 'This movie is already in your cart!',
        icon: 'warning',
      })
    } else {
      this.cartService.addItem(movie);
      // alert('Movie added to cart!');
      Swal.fire({
        text: 'Movie added to cart!',
        icon: 'success',
      })
    }
    this.activeDropdownIndex = -1;
  }
}
