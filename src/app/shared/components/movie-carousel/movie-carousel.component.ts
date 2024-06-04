import { NgFor, NgForOf, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit,Output, ViewChild,inject,EventEmitter, NgModule  } from '@angular/core';
import Swiper from 'swiper';
import { IVideoContent } from '../../models/video-content.interface';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { animate, style, transition, trigger } from '@angular/animations';
import { MovieService } from 'src/app/shared/services/movie.service';
// import { AddToFavoritesService } from '../../services/add-to-favorites.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CartServiceService } from '../../services/cart.service.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
 

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf,ReactiveFormsModule,DescriptionPipe,FormsModule,MatButtonModule,
    MatMenuModule],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MovieCarouselComponent implements OnInit,AfterViewInit{ 
  @Input() content: IVideoContent[] = [];
  @Input() title!: string;
  movieService = inject(MovieService);
  router = inject(Router);
  cartService = inject(CartServiceService);
  activeDropdownIndex: number = -1;

  @ViewChild("swiperContainer") swiperContainer!: ElementRef;
  @Output() favoriteMoviesChange: EventEmitter<IVideoContent[]> = new EventEmitter<IVideoContent[]>();
  @Output() cartMoviesChange: EventEmitter<IVideoContent[]> = new EventEmitter<IVideoContent[]>();



  favoriteMovies: IVideoContent[]=[]; 
  cartMovies: IVideoContent[] = [];
  selectedContent: string | null = null;
  searchText: string ="";
  constructor() { }
  ngAfterViewInit(): void {
   this.initSwiper();
  }

  
    ngOnInit(): void {
      this.favoriteMovies=this.content;

      // this.favoriteMovies = this.getFromLocalStorage('favoriteMovies');
      // this.cartMovies = this.getFromLocalStorage('cartMovies');

      this.content = this.content.map(movie => ({
        ...movie,
        isPremium: new Date(movie.release_date).getFullYear() === 2024
      }));
    }

    toggleDropdown(index: number) {
      this.activeDropdownIndex = this.activeDropdownIndex === index ? -1 : index;
    }
    addToFavorites(movie: IVideoContent) {
      if (!this.favoriteMovies.includes(movie)) {
        this.favoriteMovies.push(movie);
        this.favoriteMoviesChange.emit(this.favoriteMovies);
        // this.saveToLocalStorage('favoriteMovies', this.favoriteMovies);
        this.activeDropdownIndex = -1;
      }
      // console.log(this.favoriteMovies);
    }

    addToCart(movie: IVideoContent) {
      if (!this.cartMovies.includes(movie)) {
        this.cartMovies.push(movie);
        this.cartService.addItem(movie); // Add to cart service
        this.cartMoviesChange.emit(this.cartMovies);
        // this.saveToLocalStorage('cartMovies', this.cartMovies);
        this.activeDropdownIndex = -1;
      }
    }

    isMovieInFavorites(movie: IVideoContent): boolean {
      return this.favoriteMovies.includes(movie);
    }
  
    isMovieInCart(movie: IVideoContent): boolean {
      return this.cartMovies.includes(movie);
    }

    isActive=false;
    toggleButton(event: Event) {
      this.isActive = !this.isActive;
    }

  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 2,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 5000, // milliseconds
        disableOnInteraction: false // continue autoplay even when user interacts with slides
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 1,
          centeredSlides: false,
        },
        400: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 2,
          centeredSlides: false,
        },
        520: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 1,
          centeredSlides: false,
        },
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 1,
          centeredSlides: false,
        },
        700: {
          slidesPerView: 3,
          slidesPerGroup: 2,
          spaceBetween: 2,
          centeredSlides: false,
        },
        900: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 1,
          centeredSlides: false,
        },
        1200: {
          slidesPerView: 5,
          slidesPerGroup: 4,
          spaceBetween: 1,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 6,
          slidesPerGroup: 5,
          spaceBetween: 1,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 9,
          slidesPerGroup: 6,
          spaceBetween: 1,
          centeredSlides: false,
        }
      },
      // simulateTouch: true, // Disable dragging/swiping
      // allowTouchMove: true // Disable touch movements
    })
  }

  setHoverMovie(movie: IVideoContent) {
    this.selectedContent = movie.title ?? movie.name;
  }

  clearHoverMovie() {
    this.selectedContent = null;
  }

  goToMovieDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }

  searchMovies() {
    this.content = this.content.filter(movie => movie.title.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  // private saveToLocalStorage(key: string, data: any) {
  //   localStorage.setItem(key, JSON.stringify(data));
  // }

  // private getFromLocalStorage(key: string) {
  //   return JSON.parse(localStorage.getItem(key) || '[]');
  // }
  
}
