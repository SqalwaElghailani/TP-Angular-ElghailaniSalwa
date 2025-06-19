import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Product } from '../app/models/product.model';
import { ProductService } from '../app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule,RouterModule, CurrencyPipe],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  searchTerm: string = '';
  products: Product[] = [];
  topProducts: Product[] = [];
  filteredProducts: Product[] = [];
  filteredTopProducts: Product[] = []; 
  activeTopIndex = 0;
  selectedProductId: number | null = null;
 Math = Math;
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


   ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.topProducts = products.filter(p => p.rating >= 9);

        // بعد تحميل المنتجات، نخدم الفلترة حسب param de recherche
        this.route.queryParams.subscribe(params => {
          this.searchTerm = params['search'] || '';
          this.filterProducts();
        });
      },
      error => console.error('Erreur :', error)
    );
  

   
  }
 

  private filterProducts() {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products];
      this.filteredTopProducts = [...this.topProducts];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(term)
      );
      
      this.filteredTopProducts = this.topProducts.filter(product =>
        product.name.toLowerCase().includes(term)
      );
      
      if (this.filteredTopProducts.length > 0) {
        this.activeTopIndex = 0;
      }
    }
  }
  nextTopProduct() {
    this.activeTopIndex = (this.activeTopIndex + 1) % this.topProducts.length;
  }

  prevTopProduct() {
    this.activeTopIndex =
      (this.activeTopIndex - 1 + this.topProducts.length) % this.topProducts.length;
  }

  viewDetails(productId: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { product: productId },
      queryParamsHandling: 'merge'
    });
  }

  getQuantityClass(quantity: number): string {
    return quantity < 10 ? 'low-quantity' : '';
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/assets/images/default-product.png';
  }

  getRoundedStars(rating: number): number {
  return Math.floor(rating);
}
  getDiscount(oldPrice: number, newPrice: number): number {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  }
  





  addToCart(productId: number) {
  const userId = localStorage.getItem('userId');
  const date = new Date().toISOString();

  if (!userId) {
    alert("⛔ Vous devez vous connecter !");
    return;
  }

  const data = { userId, productId, date };

  this.http.post('http://localhost:3000/api/cart', data).subscribe({
    next: () => alert("✅ Produit ajouté au panier"),
    error: () => alert("❌ Erreur lors de l'ajout")
  });
}

}
