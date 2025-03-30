import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  loginClicked(): void {
    const loginData = {
      username: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:5050/api/auth/login', loginData).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        // Optionally store the role if needed:
        localStorage.setItem('role', response.role);
        this.router.navigate(['/view-manage-stocks']);
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

  registerClicked(): void {
    // Optional: route to register page if you create one
    alert('Register functionality not implemented yet.');
  }
}