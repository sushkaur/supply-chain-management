import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registrationData = {
    email: '',
    name: '',
    password: '',
  };
  isLoading = false; // For loading spinner

  constructor(private http: HttpClient, private router: Router) {}

  onRegister(): void {
    alert(`Registration Successful!`);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']); // Redirect to login page
  }
}