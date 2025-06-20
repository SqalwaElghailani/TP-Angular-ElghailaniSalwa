import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;

  constructor() {}

  // تسجيل المستخدم بعد الدخول
  login(user: any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  // استرجاع المستخدم المسجل
  getUser() {
    if (!this.currentUser) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
      if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
    }
    return this.currentUser;
     
  }

logout() {
  this.currentUser = null;
  localStorage.removeItem('user');
  localStorage.removeItem('userId'); 
}


  
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

loginUser(user: any) {
  localStorage.setItem('userId', user.id); 
}
}
