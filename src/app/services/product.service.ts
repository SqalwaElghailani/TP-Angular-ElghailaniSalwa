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
    map(apiMangas => apiMangas.map(apiManga => ({
      id: apiManga.id,
      name: apiManga.name,
      author: apiManga.author,
      imageUrl: `assets/images/${apiManga.imageUrl}`,
      genre: apiManga.genre,
      chapters: apiManga.chapters,
      rating: apiManga.rating,
      description: apiManga.description,
      fullSummary: apiManga.fullSummary,
      price: apiManga.price , // just an example, you can change it
      quantity: apiManga.quantity   // assuming number of chapters = stock
    }))),
    catchError(error => {
      console.error('Error:', error);
      return of([]);
    })
  );
}


  
  getProductById(id: number): Observable<Product | undefined> {
  return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
    map(apiManga => {
      if (!apiManga || apiManga === null) {
        console.warn('Product not found for id:', id);
        return undefined;
      }

      return {
        id: parseInt(apiManga.id),
        name: apiManga.name,
        author: apiManga.author,
        imageUrl: `assets/images/${apiManga.imageUrl}`,
        genre: apiManga.genre,
        chapters: apiManga.chapters,
        rating: apiManga.rating,
        description: apiManga.description,
        fullSummary: apiManga.fullSummary,
        price: apiManga.price,
        quantity: apiManga.quantity
      };
    }),
    catchError(error => {
      console.error('Error fetching product:', error);
      return of(undefined);
    })
  );
}

}