// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
// import { BrowseComponent } from './pages/browse/browse.component';
// import { MovieCarouselComponent } from './shared/components/movie-carousel/movie-carousel.component';
// import { FormsModule } from '@angular/forms';

// const routes: Routes = [
//   { path: '', component: LoginComponent },
//   { path: 'browse', component: BrowseComponent }
// ];

// @NgModule({
//   declarations: [MovieCarouselComponent],
//   imports: [RouterModule.forRoot(routes),FormsModule],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
// import { SearchComponent } from './shared/components/search/search.component';
import { MovieCarouselComponent } from './shared/components/movie-carousel/movie-carousel.component';
import { FavoriteMoviesComponent } from './shared/components/favorite-movies/favorite-movies.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './shared/components/cart/cart.component';
 

@NgModule({
  declarations: [
    AppComponent,
    BrowseComponent,
    // SearchComponent,
    MovieCarouselComponent,
    FavoriteMoviesComponent,
    MovieDetailsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // RouterModule.forRoot(routes) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

