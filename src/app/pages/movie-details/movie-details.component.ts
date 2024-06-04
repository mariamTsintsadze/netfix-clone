import { Component, OnInit,inject,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/shared/services/movie.service';
import { Title,Meta } from '@angular/platform-browser';
import { IVideoContent } from 'src/app/shared/models/video-content.interface';
import { BrowseComponent } from '../browse/browse.component';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { CartServiceService } from 'src/app/shared/services/cart.service.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent  implements OnInit{
  movie: any;
  // isPremium: boolean = false;
  // isPurchased: boolean = false;

  favoriteMovies: IVideoContent[] = [];
  cartMovies: IVideoContent[] = [];
  // img:any='https://image.tmdb.org/t/p/w500/' + movie.backdrop_path;
    constructor(
      private route: ActivatedRoute,
       private http: HttpClient, 
       private movieService: MovieService,
      //  private location: Location,
       private cartService: CartServiceService,
      private router: Router ) { }
  
    ngOnInit(): void {
      const movieId = this.route.snapshot.paramMap.get('id');
      if (movieId) { 
        this.fetchMovieDetails(movieId);
      } else {
        console.error('Movie ID is null or undefined');
      }
    }
  
    fetchMovieDetails(movieId: string) {
      const apiKey = '85036120ca085d2e5f8c475c9fa9fbe3'; 
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  
      this.http.get<any>(url)
        .subscribe(
          data => {
            this.movie = data;
            // this.isPremium = data.isPremium; // Assuming you have this property on the movie object
            // this.isPurchased = this.cartService.isMoviePurchased(movieId);
          },
          error => {
            console.error('Error fetching movie details:', error);
          }
        );
    }

    goBack(): void {
      // this.location.back();
      this.router.navigate(['browse']);
    }
    
      addItem() {
        if (this.movie) {
          this.cartService.addItem(this.movie);
          // alert('Movie added to cart!');
          Swal.fire({
            title: 'Error!',
            text: 'Movie added to cart!',
            icon: 'warning',
          })
        }
      }

      // addItem() {
      //   if (this.movie) {
      //     if (this.isPremium && !this.isPurchased) {
      //       alert('You need to purchase this movie before watching.');
      //     } else {
      //       this.cartService.addItem(this.movie);
      //       alert('Movie added to cart!');
      //     }
      //   }
      // }
      
      goToCart() {
        this.router.navigate(['/cart']);
      }

}
