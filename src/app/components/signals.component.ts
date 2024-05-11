import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'signals',
  standalone: true,
  template: `
    <ul>
      @for (user of usersSignal(); track $index) {
      <li>{{ user.name }}</li>
      <ul>
        @if(isEvenComputed()) {
        <li>{{ user.email }}</li>
        }
      </ul>
      }
    </ul>
  `,
})
export class SignalsComponent implements OnInit {
  usersSignal = inject(UserService).usersSignal;

  tickSignal = signal(1);
  isEvenComputed = computed(() => this.tickSignal() % 2 === 0);

  ngOnInit() {
    setInterval(() => {
      this.tickSignal.update((current) => current + 1);
    }, 600);
  }
}
