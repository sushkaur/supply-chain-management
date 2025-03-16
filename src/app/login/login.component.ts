
import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  @Output() loginSuccess = new EventEmitter<void>();

  constructor(private http: HttpClient, private router: Router) {}

  loginClicked(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.router.navigate(['/view-manage-stocks']);
  }

  registerClicked(): void {
    // Navigate to the registration page
    this.router.navigate(['/register']);
  }
}