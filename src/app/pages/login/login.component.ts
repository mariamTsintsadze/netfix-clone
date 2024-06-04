declare var google: any;
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RegistrationComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private router = inject(Router);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '173896124180-t9vuvj3bcfsgcvu2h2c9299h35kvnbp3.apps.googleusercontent.com',
      callback: (resp: any)=> this.handleLogin(resp)
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350
    })
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any){
    if(response) {
      const payLoad = this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
      this.router.navigate(['browse'])
    }
  }
  navToRegistration(){
    this.router.navigate(['registration']);
  }

}
