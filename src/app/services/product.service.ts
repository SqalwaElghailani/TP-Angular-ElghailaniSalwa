import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Ordinateur Portable',
      description: 'PC portable 15 pouces, 16GB RAM, 512GB SSD',
      price: 899.99,
      quantity: 15,
      imageUrl: 'assets/images/laptop.jpg'
    },
    {
      id: 2,
      name: 'Smartphone',
      description: 'Smartphone 6.5 pouces, 128GB, 4 caméras',
      price: 599.99,
      quantity: 8,
      imageUrl: 'assets/images/phone.jpg'
    },
    {
      id: 3,
      name: 'Casque Bluetooth',
      description: 'Casque sans fil avec réduction de bruit',
      price: 199.99,
      quantity: 0,
      imageUrl: 'assets/images/headphones.jpg'
    },
    {
      id: 4,
      name: 'Souris Gaming',
      description: 'Souris ergonomique avec 6 boutons programmables',
      price: 49.99,
      quantity: 5,
      imageUrl: 'assets/images/mouse.jpg'
    }
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products.filter(product => product.quantity > 0);
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}