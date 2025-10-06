import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'northwind';
  constructor(private router: Router) {}

  isAuthPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/' || this.router.url === '/register';
  }
  isCategoryVisible(): boolean {
  const hideFor = ['/sepet']; // Category gizlenecek sayfalar
  return !hideFor.includes(this.router.url);
}

}
