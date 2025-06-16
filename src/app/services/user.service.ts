// user.service.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, BehaviorSubject, of, throwError } from 'rxjs';
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

 // في user.service.ts
 signIn(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/api/signin', 
      { 
        email: email.trim(), 
        password: password 
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    ).pipe(
      catchError(error => {
        console.error('Login error:', error);
        // تمرير رسالة الخطأ من الخادم إذا وجدت
        const errorMsg = error.error?.message || error.message || 'Login failed';
        return throwError(() => new Error(errorMsg));
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