import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Product } from '../app/models/product.model';
import { ProductService } from '../app/services/product.service';
import { error } from 'console';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ProductDetailsComponent], // Importez ProductDetailsComponent ici
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  products: Product[] = [];
  selectedProductId: number | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products =>this.products = products,
      error => console.error('erreur :',error)
    ); 
  }

  viewDetails(productId: number): void {
    this.selectedProductId = productId;
  }
  

  getQuantityClass(quantity: number): string {
    return quantity < 10 ? 'low-quantity' : '';
  }



  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/assets/images/default-product.png';
  }
  
}