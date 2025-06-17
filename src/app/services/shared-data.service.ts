import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private selectedProducts: any[] = [];
  private userId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setSelectedProducts(products: any[], userId: number): void {
    this.selectedProducts = products;
    this.userId = userId;
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('selectedProducts', JSON.stringify(products));
      localStorage.setItem('userId', String(userId));
    }
  }

  getSelectedProducts(): { products: any[], userId: number | null } {
    // First try in-memory storage
    if (this.selectedProducts.length > 0) {
      return { products: this.selectedProducts, userId: this.userId };
    }

    // Fallback to localStorage only in browser
    if (isPlatformBrowser(this.platformId)) {
      const products = localStorage.getItem('selectedProducts');
      const userId = localStorage.getItem('userId');
      return {
        products: products ? JSON.parse(products) : [],
        userId: userId ? +userId : null
      };
    }

    return { products: [], userId: null };
  }

  clear(): void {
    this.selectedProducts = [];
    this.userId = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('selectedProducts');
      localStorage.removeItem('userId');
    }
  }
}