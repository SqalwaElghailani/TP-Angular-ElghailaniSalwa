import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SharedDataService } from '../app/services/shared-data.service';

@Component({
  selector: 'app-commende',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commende.component.html',
  styleUrls: ['./commende.component.css']
})
export class CommendeComponent implements OnInit {
  selectedProducts: any[] = [];
  adresse: string = '';
  telephone: string = '';
  userId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras?.state as { selectedProducts: any[], userId: number };

      if (state?.selectedProducts) {
        this.selectedProducts = state.selectedProducts;
        this.userId = state.userId;
        this.sharedDataService.setSelectedProducts(state.selectedProducts, state.userId);
      } else {
        const { products, userId } = this.sharedDataService.getSelectedProducts();
        this.selectedProducts = products;
        this.userId = userId;
      }

      if (this.selectedProducts.length === 0) {
        alert('⛔ Aucun produit sélectionné. Retour au panier.');
        this.router.navigate(['/cart']);
      }

      // تعيين كمية 1 بشكل مبدئي لكل منتج
      this.selectedProducts.forEach(p => {
        if (!p.quantity) {
          p.quantity = 1;
        }
      });
    }
  }

  calculerPrixTotal(): number {
    return this.selectedProducts.reduce((total, produit) => total + produit.price * produit.quantity, 0);
  }

  confirmerCommande() {
    if (!this.adresse || !this.telephone) {
      this.errorMessage = "Veuillez remplir tous les champs requis.";
      return;
    }

    const commandeData = {
  userId: this.userId,
  products: this.selectedProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    quantity: p.quantity && p.quantity > 0 ? p.quantity : 1
  })),
  adresse: this.adresse,
  telephone: this.telephone,
  date: new Date().toISOString(),
  totalPrice: this.calculerPrixTotal()
};

    console.log('Données envoyées:', JSON.stringify(commandeData, null, 2));

    this.http.post('http://localhost:3000/api/commandes', commandeData)
      .subscribe({
        next: (response) => {
          alert('✅ Commande enregistrée avec succès !');
          //this.router.navigate(['/mes-commandes']);
        },
        error: (err) => {
          this.errorMessage = `Erreur technique: ${err.status} - ${err.message}`;
        }
      });
  }
}
