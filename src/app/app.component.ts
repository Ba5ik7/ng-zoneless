import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { combineLatest, interval, map, tap } from 'rxjs';

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <h1>{{ title }}</h1>
    <router-outlet></router-outlet>
    @if (viewModel$ | async; as viewModel) {
    <h2>Users</h2>
    <ul>
      @for (user of viewModel.users; track $index) {
      <li>{{ user.name }}</li>
      <ul>
        @if(viewModel.interval) {
          <li>{{ user.email }}</li>
        }
      </ul>
      }
    </ul>
    }
  `,
  styles: [``],
})
export class AppComponent {
  title = 'zoneless';

  httpClient = inject(HttpClient);

  viewModel$ = combineLatest({
    users: this.fetchUsers(),
    interval: interval(1000).pipe(map((value) => value % 2 === 0)),
  }).pipe(tap(console.log));

  fetchUsers() {
    return this.httpClient.get<User[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
}
