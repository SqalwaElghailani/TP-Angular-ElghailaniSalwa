import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { CardService } from '../app/services/card.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() product!: any;  // Le "!" indique que product sera défini par Angular

  cartProducts: any[] = [];
  isLoading: boolean = true; 
  userId: number | null = null;
  
  constructor(
    private http: HttpClient,
    private cartService: CardService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  
  

 

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.userId = +userId;
        this.loadCart();
      } else {
        this.isLoading = false;
      }
    }
  }

  loadCart() {
    if (!this.userId) return;
    
    this.cartService.getUserCart(this.userId).subscribe({
      next: (data) => {
        console.log('Cart items:', data);
        this.cartProducts = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        this.isLoading = false;
      }
    });
  }

  addToCart() {
    if (!isPlatformBrowser(this.platformId)) return;

    const userIdString = localStorage.getItem('userId');
    if (!userIdString) {
      alert("⛔ Vous devez vous connecter.");
      return;
    }

    const userId = Number(userIdString);
    const productId = this.product.id;
    const date = new Date().toISOString();

    this.http.post('http://localhost:3000/api/cart', { userId, productId, date }).subscribe({
      next: () => alert("✅ Produit ajouté au panier !"),
      error: (err) => {
        console.error("Erreur ajout panier:", err);
        alert("❌ Erreur lors de l'ajout au panier");
      }
    });
  }

  getDiscount(oldPrice: number | undefined, price: number): number {
    if (!oldPrice || oldPrice <= price) {
      return 0;
    }
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  }
}
