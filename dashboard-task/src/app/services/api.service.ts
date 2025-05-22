import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  user: {
    email: string;
  };
}

export interface Item {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    debugger
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password });
  }

  getItems(): Observable<Item[]> {
    debugger
    return this.http.get<Item[]>(`${this.baseUrl}/items`);
  }
} 