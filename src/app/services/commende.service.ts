import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:3000/api/commandes';

  constructor(private http: HttpClient) {}

  passerCommande(userId: number, productIds: number[]) {
    return this.http.post(this.apiUrl, { userId, productIds });
  }
}
