import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mes-commandes',
   standalone: true,
   imports: [CommonModule], 
  templateUrl: './mes-commandes.component.html',
  styleUrls: ['./mes-commandes.component.css']
})
export class MesCommandesComponent implements OnInit {
  commandes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.http.get<any[]>(`http://localhost:3000/api/commandes/${userId}`).subscribe(
        data => {
        this.commandes = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        },
        error => {
          console.error('Erreur lors du chargement des commandes', error);
        }
      );
    }
  }
  loadCommandes() {
    // Charge les commandes (à adapter selon ta méthode)
    const userId = Number(localStorage.getItem('userId'));
    this.http.get<any[]>(`http://localhost:3000/api/commandes/user/${userId}`).subscribe(data => {
    this.commandes = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  annulerProduit(commandeId: number) {
    if (confirm("Voulez-vous vraiment annuler cette commande ?")) {
      this.http.delete(`http://localhost:3000/api/commandes/${commandeId}`).subscribe({
        next: () => {
          alert("Commande annulée avec succès");
          this.loadCommandes(); // recharge la liste après suppression
        },
        error: () => {
          alert("Erreur lors de l'annulation");
        }
      });
    }
  }
}
