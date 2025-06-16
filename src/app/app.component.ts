import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, RouterOutlet,Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';



@Component({
  selector: 'app-root',
  
  standalone: true,
  imports: [CommonModule, RouterOutlet,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tp5';

  showHomeComponent: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // هنا كتخبي app-home فصفحات login مثلاً
        this.showHomeComponent = !['/home', '/signin'].includes(event.url);
      }
    });
  }
}
