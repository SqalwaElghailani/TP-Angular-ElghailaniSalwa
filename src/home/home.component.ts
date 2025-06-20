import { Component, Inject, OnInit, PLATFORM_ID, Input } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CardService } from '../app/services/card.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../app/services/product.service';
import { AuthService } from '../app/services/auth.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cartCount: number = 0;
  searchTerm: string = '';
  products: any[] = [];
  showCompte = false;

  constructor(
      private router: Router,
    private cartService: CardService,
    private productService: ProductService,
    public authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.cartService.getUserCart(+userId).subscribe(data => {
          this.cartCount = data.length;
        });
      }
    }

    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

   toggleCompte() {
    this.showCompte = !this.showCompte;
  }
  onSearchSubmit() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/Catalog'], {
        queryParams: { search: this.searchTerm }
      });
    }
  }
  onSearchChange() {
    console.log('Recherche:', this.searchTerm);
  }
   logout() {
    this.authService.logout(); 
    this.router.navigate(['/signin']); 
  }
}