import { Component, OnInit, inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { BannerComponent } from 'src/app/core/components/banner/banner.component';
import { MovieService } from 'src/app/shared/services/movie.service';
import { MovieCarouselComponent } from 'src/app/shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from 'src/app/shared/models/video-content.interface';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { FavoriteMoviesComponent } from 'src/app/shared/components/favorite-movies/favorite-movies.component';
// import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartServiceService } from 'src/app/shared/services/cart.service.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule,FormsModule, HeaderComponent, BannerComponent,MovieCarouselComponent,FavoriteMoviesComponent] ,
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private cartService: CartServiceService) { }
  auth = inject(AuthService);
  movieService = inject(MovieService);
  name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();
  // @Output() movieSelected = new EventEmitter<any>();
  favoriteMovies: IVideoContent[] = [];
  cartMovie: IVideoContent[] = [];
  query: string = '';
  results: any[] = [];

  searchText: string="";
  searchQuery: string="";
  searchedMovies: IVideoContent[]=[];
  errorMessage: string="";

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];
  combinedMovies: any[] = [];
  //arr of observable
  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getRatedMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];
  selectedMovie: any;

  ngOnInit(): void {
    this.fetchMovies();
    this.fetchTvShows();
    this.fetchRatedMovies();
    this.fetchNowPlayingMovies();
    this.fetchUpcomingMovies();
    this.fetchPopularMovies();
    this.fetchTopRatedMovies();
    // this.fetchFavoriteMovies();

    // if (!this.auth.isLoggedIn()) {
    //   this.router.navigate(['/login']);
    // }

    this.movieService.getAllContent().subscribe(results => {
      this.combinedMovies = [
        ...results.movies.results,
        ...results.tvShows.results,
        ...results.ratedMovies.results,
        ...results.nowPlayingMovies.results,
        ...results.popularMovies.results,
        ...results.topRatedMovies.results,
        ...results.upcomingMovies.results
      ];
      // console.log("combined movies="+this.combinedMovies); // Verify combined results
    });
  }

  fetchMovies() {
    this.movieService.getMovies().subscribe({
      next: (res) => {
        this.movies = res.results.map((movie: any )=> ({
          ...movie,
          isPremium: new Date(movie.release_date).getFullYear() === 2024
        }));
        if (res.results.length >= 2) {
          this.bannerDetail$ = this.movieService.getBannerDetail(res.results[0].id);
          this.bannerVideo$ = this.movieService.getBannerVideo(res.results[0].id);
        }
      },
      error: (err) => console.error('Error fetching movies:', err)
    });
  }

  fetchTvShows() {
    this.movieService.getTvShows().subscribe({
      next: (res) => {
        this.tvShows = res.results.map((show: any )=> ({
          ...show,
          isPremium: new Date(show.first_air_date).getFullYear() === 2024
        }));
      },
      error: (err) => console.error('Error fetching TV shows:', err)
    });
  }

  fetchRatedMovies() {
    this.movieService.getRatedMovies().subscribe({
      next: (res) => {
        this.ratedMovies = res.results.map((movie: any) => ({
          ...movie,
          isPremium: new Date(movie.release_date).getFullYear() === 2024
        }));
      },
      error: (err) => console.error('Error fetching rated movies:', err)
    });
  }

  fetchNowPlayingMovies() {
    this.movieService.getNowPlayingMovies().subscribe({
      next: (res) => {
        this.nowPlayingMovies = res.results.map((movie: any) => ({
          ...movie,
          isPremium: new Date(movie.release_date).getFullYear() === 2024
        }));
      },
      error: (err) => console.error('Error fetching now playing movies:', err)
    });
  }

  fetchUpcomingMovies() {
    this.movieService.getUpcomingMovies().subscribe({
      next: (res) => {
        this.upcomingMovies = res.results.map((movie: any) => ({
          ...movie,
          isPremium: new Date(movie.release_date).getFullYear() === 2024
        }));
      },
      error: (err) => console.error('Error fetching upcoming movies:', err)
    });
  }

  fetchPopularMovies() {
    this.movieService.getPopularMovies().subscribe({
      next: (res) => {
        this.popularMovies = res.results.map((movie: any) => ({
          ...movie,
          isPremium: new Date(movie.release_date).getFullYear() === 2024
        }));
      },
      error: (err) => console.error('Error fetching popular movies:', err)
    });
  }

  fetchTopRatedMovies() {
    this.movieService.getTopRated().subscribe({
      next: (res) => {
        this.topRatedMovies = res.results.map((movie: any) => ({
          ...movie,
          isPremium: new Date(movie.release_date).getFullYear() === 2024
        }));
      },
      error: (err) => console.error('Error fetching top rated movies:', err)
    });
  }
  
  onFavoriteMoviesChange(updatedFavoriteMovies: IVideoContent[]) {
    this.favoriteMovies = updatedFavoriteMovies;
    console.log(updatedFavoriteMovies);
  }
  onCartMoviesChange(updatedCart: IVideoContent[]) {
    console.log('Cart movies updated:', updatedCart);
    this.cartMovie = updatedCart;
  }
  selectMovie(movie: any) {
    this.selectedMovie = movie;
  }

  singOut() {
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }

  onSearch(): void {
    this.movieService.searchMovies(this.query).subscribe(
      data => {
        this.searchedMovies = data.results;
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = 'Error fetching movies. Please try again later.';
        console.error('Error fetching movies:', error);
      }
    );
  }

  goToMovieDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

addItem(movie: any) {
  if (this.cartService.isInCart(movie)) {
    // alert('This movie is already in your cart!');
    Swal.fire({
      title: 'Error!',
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
}

}
