export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
      oldPrice?: number; // pour afficher le prix barré
    quantity: number;
    imageUrl?: string;
    
    author: string;
    genre: string;
    rating: number;
    chapters: number;
    fullSummary: string;
  }