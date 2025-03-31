import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false
})
export class RegisterComponent {
  username = '';
  password = '';
  role = 'buyer';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  registerClicked(): void {
    const userData = { username: this.username, password: this.password, role: this.role };

    this.authService.register(userData).subscribe({
      next: (res) => {
        this.successMessage = 'Registration successful!';
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        this.router.navigate(['/view-manage-stocks']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }


  onRegister(): void {
    const userData = { username: this.username, password: this.password, role: this.role };
    this.authService.register(userData).subscribe({
      next: () => {
        alert('Registration Successful!');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Registration Failed!');
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}