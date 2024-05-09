import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, interval, map, startWith, tap } from 'rxjs';

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
  imports: [CommonModule],
  template: `
    <!-- Idiomatic Reactive Data Stream -->
    @if (viewModel$ | async; as viewModel) {
    <h2>RxJs</h2>
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

    <!-- interop Observable to Signal -->
    <h2>RxJs & Signals & Interop</h2>
    <ul>
      @for (user of usersInteropSignal(); track $index) {
      <li>{{ user.name }}</li>
      <ul>
        @if(intervalSignal()) {
        <li>{{ user.email }}</li>
        }
      </ul>
      }
    </ul>

    <!-- Signal & Computed & Interop-->
    <h2>Signals & Computed & Interop</h2>
    <ul>
      @for (user of usersInteropSignal(); track $index) {
      <li>{{ user.name }}</li>
      <ul>
        @if(isEvenSignal()) {
        <li>{{ user.email }}</li>
        }
      </ul>
      }
    </ul>
  `,
  styles: [``],
})
export class AppComponent {
  httpClient = inject(HttpClient);
  // Mocking Some Service call
  fetchUsers$ = this.httpClient.get<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  );

  // Idiomatic Reactive Data Streams
  viewModel$ = combineLatest({
    users: this.fetchUsers$,
    interval: interval(3000).pipe(
      map((value) => value % 2 === 0),
      startWith(false)
    ),
  }).pipe(tap(console.log));
  // END Idiomatic Reactive Data Streams

  // interop Observable to Signal
  usersInteropSignal = toSignal(this.fetchUsers$);
  intervalSignal = toSignal(
    interval(3000).pipe(map((value) => value % 2 === 0))
  );
  // END interop Observable to Signal

  // Only Signals and Computed
  tickSignal = signal(1);
  isEvenSignal = computed(() => this.tickSignal() % 2 === 0);
  ngOnInit() {
    setInterval(() => {
      this.tickSignal.update((current) => current + 1);
    }, 3000);
  }
  // END Only Signals and Computed
}
