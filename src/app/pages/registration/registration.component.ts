import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  signupUsers: any[] = [];
  signupObj: any = {
    userName: '',
    email: '',
    password: ''
  };
  loginObj: any = {
    userName: '',
    password: ''
  };

  constructor(private router: Router){}

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null) {
      this.signupUsers=JSON.parse(localData);
    }
  }
  onSignUp(){
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      userName: '',
      email: '',
      password: ''
    };
  }

  // alert(title:string, icon:any, text:any){
  //   Swal({title, icon, text});
  // }

  onLogin(){
    const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password)
    if(isUserExist !=undefined) {
      // alert('User Login Successfully', 'success');
      Swal.fire({
        text: 'User Login Successfully',
        icon: 'success',
      })
      this.router.navigate(['/browse']);
    }else {
      // alert('Wrong credentials', "warning");
      Swal.fire({
        title: 'Error!',
        text: 'Wrong credentials',
        icon: 'warning',
      })
    }
  }

}
