// user.service.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, BehaviorSubject, of } from 'rxjs';
import { SafeUser, User } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/signin';
  private currentUserSubject = new BehaviorSubject<SafeUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }

  signIn(email: string, password: string): Observable<SafeUser | null> {
    return this.http.post<User>(this.apiUrl, { email, password }).pipe(
      map(user => {
        const safeUser: SafeUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };

        if (this.isBrowser) {
          localStorage.setItem('currentUser', JSON.stringify(safeUser));
        }

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
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): SafeUser | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}