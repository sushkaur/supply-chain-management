import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly baseUrl = 'http://localhost:5050/api/inventory';

  constructor(private readonly http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token') ?? '';
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getAllInventory(): Observable<any> {
    return this.http.get(this.baseUrl, this.getAuthHeaders());
  }

  createItem(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data, this.getAuthHeaders());
  }

  updateItem(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, this.getAuthHeaders());
  }

  deleteItem(id: string) {
    return this.http.delete(`/api/inventory/${id}`);
  }
}