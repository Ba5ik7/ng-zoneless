import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>{{ title }}</h1>
    <nav>
      <a routerLink="/signals">Signals</a>
      <a routerLink="/observable">Observable</a>
      <a routerLink="/interop">Interop</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      nav {
        display: flex;
        gap: 1rem;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Zoneless Angular';
}
