import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'interop',
  standalone: true,
  template: `
    <ul>
      @for (user of usersSignal(); track $index) {
      <li>{{ user.name }}</li>
      <ul>
        @if(isEvenSignal()) {
        <li>{{ user.email }}</li>
        }
      </ul>
      }
    </ul>
  `,
})
export class InteropComponent {
  usersSignal = toSignal(inject(UserService).users$);
  isEvenSignal = toSignal(interval(600).pipe(map((num) => num % 2 === 0)));
}
