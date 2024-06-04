declare var google: any;
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
router = inject(Router);
private loggedIn = false;

constructor(private http: HttpClient) {}
signOut(){
  google.accounts.id.disableAutoSelect();
  this.router.navigate(['/'])
}

// login(email: string, password: string): Observable<boolean> {
//   // Replace with your dummy API endpoint
//   const apiEndpoint = 'https://dummyapi.io/data/v1/user/login';

//   // For demo purposes, we're faking an API call
//   return this.http.post<any>(apiEndpoint, { email, password }).pipe(
//     map(response => {
//       // Check the response from your API
//       if (response && response.token) {
//         localStorage.setItem('authToken', response.token);
//         this.loggedIn = true;
//         return true;
//       }
//       return false;
//     }),
//     catchError(() => of(false))
//   );
// }
logout() {
  localStorage.removeItem('authToken');
  this.loggedIn = false;
}

// isLoggedIn(): boolean {
//   return !!localStorage.getItem('authToken');
// }
}
