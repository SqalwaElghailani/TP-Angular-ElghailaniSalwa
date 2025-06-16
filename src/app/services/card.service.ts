import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUserCart(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cart/${userId}`).pipe(
      tap(data => console.log('Cart data received:', data)),
      catchError(error => {
        console.error('Error fetching cart:', error);
        return of([]);
      })
    );
  }
}