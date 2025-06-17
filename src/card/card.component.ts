import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { CardService } from '../app/services/card.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from '../app/services/shared-data.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() product!: any;
  cartProducts: any[] = [];
  isLoading: boolean = true;
  userId: number | null = null;

  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
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

 proceedToBuy() {
    if (!this.userId) {
      alert("⛔ Vous devez vous connecter.");
      return;
    }

    const selectedProducts = this.cartProducts.filter(p => p.selected);

    if (selectedProducts.length === 0) {
      alert("⛔ Vous devez sélectionner au moins un produit.");
      return;
    }

    // Sauvegarde dans le service + localStorage
    this.sharedDataService.setSelectedProducts(selectedProducts, this.userId);

    // Navigation avec state (au cas où)
    this.router.navigate(['/commende'], {
      state: { selectedProducts, userId: this.userId }
    });
  }



buySelected(): void {
  const selectedProducts = this.cartProducts.filter(p => p.selected);

  if (selectedProducts.length === 0) {
    alert("Veuillez sélectionner au moins un produit.");
    return;
  }

  // حفظ المعلومات مؤقتًا في localStorage
  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));

  // توجيه المستخدم إلى صفحة /commende
  this.router.navigate(['/commende']);
}

  hasSelectedItems(): boolean {
    return this.cartProducts && this.cartProducts.some(p => p.selected);
  }
}
