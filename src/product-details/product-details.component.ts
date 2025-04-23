import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyPipe } from '@angular/common';
import { Product } from '../app/models/product.model';
import { ProductService } from '../app/services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() productId!: number;
  product?: Product;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    if (this.productId) {
      this.product = this.productService.getProductById(this.productId);
    }
  }
}