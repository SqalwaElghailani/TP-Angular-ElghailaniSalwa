import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../app/models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  @ViewChild('signInForm') signInForm!: NgForm;
  credentials: Partial<User> = { email: '', password: '' };
  signInError: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  signIn() {
    this.http.post<any>('http://localhost:3000/api/signin', this.credentials).subscribe({
      next: (res) => {
        console.log("Connexion réussie", res.user);

        // خزن userId ف localStorage (تأكد من اسم الحقل في الرد)
        const userId = res.user.id; // أو حسب استجابة API ديالك
        localStorage.setItem('userId', userId);

        this.signInError = false;

        // تنقل لصفحة الكتالوج
        this.router.navigate(['/Catalog']);
      },
      error: (err) => {
        console.log("Erreur de connexion", err);
        this.signInError = true;
      }
    });
  }
}
