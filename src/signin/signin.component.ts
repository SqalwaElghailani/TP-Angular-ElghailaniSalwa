import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../app/models/user.model';
import { UserService } from '../app/services/user.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  credentials: Partial<User> = { email: '', password: '' };
  signInError: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

 signIn() {
  this.userService.signIn(this.credentials.email!, this.credentials.password!)
    .subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate(['/catalog']);
        } else {
          this.signInError = true;
        }
      },
      error: () => this.signInError = true
    });
}

}
