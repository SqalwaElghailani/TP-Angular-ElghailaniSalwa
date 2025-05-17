import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../app/models/user.model';
import { UserService } from '../app/services/user.service';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule], // Ajouter les modules nécessaires
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  credentials: Partial<User> = { email: '', password: '' }; // Utiliser Partial pour les champs optionnels
  signInError: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  signIn() {
    this.signInError = false;
    
    // Vérifier que les credentials sont valides
    if (!this.credentials.email || !this.credentials.password) {
      this.signInError = true;
      return;
    }

    // Appel correct du service avec les paramètres séparés
    this.userService.signIn(
      this.credentials.email,
      this.credentials.password
    ).subscribe({
      next: () => this.router.navigate(['/catalog']),
      error: () => this.signInError = true
    });
  }
}