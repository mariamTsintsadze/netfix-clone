import { Routes } from '@angular/router';
// import { MovieListComponent } from './shared/components/movie-list/movie-list.component';
import { CartComponent } from './shared/components/cart/cart.component';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./pages/login/login.component').then(a => a.LoginComponent) },
  {path: 'registration', loadComponent: () => import('./pages/registration/registration.component').then(a => a.RegistrationComponent) },
  {path: 'browse', loadComponent: () => import('./pages/browse/browse.component').then(a => a.BrowseComponent) },
  // {path:'search', loadComponent: () => import('./shared/components/search/search.component').then(a => a.SearchComponent)},
  {path:'movie/:id',loadComponent: () => import('./pages/movie-details/movie-details.component').then(a => a.MovieDetailsComponent)},
  {path:'cart', loadComponent: () => import('./shared/components/cart/cart.component').then(a => a.CartComponent)},
  {path:'payment', loadComponent: () => import('./shared/components/payment/payment.component').then(a => a.PaymentComponent)},
  {path: '**', loadComponent: () => import('./pages/browse/browse.component').then(a => a.BrowseComponent) },
  ];
