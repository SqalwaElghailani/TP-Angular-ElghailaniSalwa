import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../app/models/product.model';
import { ProductService } from '../app/services/product.service';
import { ActivatedRoute ,Router, RouterModule} from '@angular/router';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const productId = idParam ? +idParam : null;

    if (productId !== null) {
      this.productService.getProductById(productId).subscribe(
        product => this.product = product,
        error => console.error('Erreur :', error)
      );
    }
  }
  acheterProduit(productId: number) {
  this.router.navigate(['/commende'], { queryParams: { productId } });
}
}
