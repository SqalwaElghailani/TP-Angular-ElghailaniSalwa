// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, BehaviorSubject, of } from 'rxjs';
import { SafeUser, User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/signin';
  private currentUserSubject = new BehaviorSubject<SafeUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Vérifier le localStorage au chargement du service
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  signIn(email: string, password: string): Observable<SafeUser | null> {
    return this.http.post<User>(this.apiUrl, { email, password }).pipe(
      map(user => {
        // Créer un objet utilisateur sécurisé sans le mot de passe
        const safeUser: SafeUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
        
        // Stocker l'utilisateur dans le localStorage et le subject
        localStorage.setItem('currentUser', JSON.stringify(safeUser));
        this.currentUserSubject.next(safeUser);
        return safeUser;
      }),
      catchError(error => {
        console.error('Erreur de connexion:', error);
        return of(null);
      })
    );
  }

  signOut(): void {
    // Supprimer l'utilisateur du localStorage et du subject
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): SafeUser | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}