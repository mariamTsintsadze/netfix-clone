// import { Component, Input, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AuthService } from 'src/app/shared/services/auth.service';
// import { MovieService } from 'src/app/shared/services/movie.service';
// import {FormControl,FormGroup} from '@angular/forms';
// import { IVideoContent } from 'src/app/shared/models/video-content.interface';
// import { Title,Meta } from '@angular/platform-browser';
// import { Router } from '@angular/router';



// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss']
// })
// export class HeaderComponent implements OnInit{
//   @Input({required: true}) userImg: string = '';

//   username = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
//   auth = inject(AuthService);
//   navList = ["Home", "Search"];

//   constructor(private router: Router, private movieService: MovieService) { } 

//   ngOnInit(): void {
//     // Initialize user data
//     // this.username = "YourUsername";
//     // thi
//   }

//   @Input() content: IVideoContent[] = [];
//   @Input() title!: string;
//   // movieService = inject(MovieService);
//   searchText: string ="";

//   if (this.searchText.trim() !== '') {
//     this.movieService.searchMovies(this.searchText).subscribe(
//       (data) => {
//         this.searchResults = data.results;
//       },
//       (error) => {
//         console.error('Error fetching search results:', error);
//       }
//     );
//   }
//   viewMovieDetails(movieId: number) {
//     this.router.navigate(['/movie', movieId]);
//   }
// }

import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MovieService } from 'src/app/shared/services/movie.service';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/app/shared/services/cart.service.service';
import { Observable } from 'rxjs';
import { IVideoContent } from 'src/app/shared/models/video-content.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  @Input({ required: true }) userImg: string = '';
  username = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  auth = inject(AuthService);
  // navList = ["Home", "Search"];
  cartService= inject(CartServiceService);
  router= inject(Router);


  navigateToCart() {
    this.router.navigate(['/cart']);
  }

}

