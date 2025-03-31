import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5050/api/auth';

  constructor(private http: HttpClient) {}

  register(data: { username: string; password: string; role?: string }) {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  login(data: { username: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }
}