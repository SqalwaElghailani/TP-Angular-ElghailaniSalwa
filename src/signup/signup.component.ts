import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule, CommonModule]
})
export class SignupComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient ,private router: Router) {}

  onSignup() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };


    this.http.post('http://localhost:3000/api/signup', user).subscribe({
      next: (res: any) => {
        this.successMessage = 'Inscription réussie';
        this.errorMessage = '';
        this.resetForm();
        setTimeout(() => {
        this.router.navigate(['/signin']);
      }, 2000);
    
      },
      error: err => {
        this.successMessage = '';
        this.errorMessage = err.error.message || 'Erreur lors de l\'inscription';
      }
    });
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }
}
