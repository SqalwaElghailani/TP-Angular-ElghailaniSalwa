import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/products'; 

  constructor(private http : HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(apiProducts => apiProducts.map(apiProduct => ({
        id: apiProduct.productID,
        name: apiProduct.productTitle,
        price: apiProduct.productPrice,
        quantity: apiProduct.quantity,
        imageUrl: `assets/images/${apiProduct.productImage}`,
        description: apiProduct.category
      }))),
      catchError(error => {
        console.error('Erreur:', error);
        return of([]);
      })
    );
  }
  
  getProductById(id: number): Observable<Product | undefined> { // ID en string
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(apiProduct => ({
        id: apiProduct.productID,
        name: apiProduct.productTitle,
        price: apiProduct.productPrice,
        quantity: apiProduct.quantity,
        imageUrl: `assets/images/${apiProduct.productImage}`,
        description: apiProduct.category
      })),
      catchError(error => {
        console.error('Erreur:', error);
        return of(undefined);
      })
    );
  }
}