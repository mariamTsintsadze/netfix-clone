// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { IVideoContent } from '../../models/video-content.interface';
// import { MovieService } from '../../services/movie.service';
// import { CartServiceService } from '../../services/cart.service.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-movie-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './movie-list.component.html',
//   styleUrls: ['./movie-list.component.scss']
// })
// export class MovieListComponent implements OnInit{
//   movies: IVideoContent[] = [];

//   constructor(
//     private movieService: MovieService,
//     private cartService: CartServiceService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.movieService.getMovies().subscribe(movies => {
//       this.movies = movies;
//     });
//   }

//   addToCart(movie: IVideoContent): void {
//     // this.cartService.addToCart(movie);
//     alert(`${movie.title} has been added to the cart.`);
//     this.router.navigate(['/cart']);
//   }
// }
