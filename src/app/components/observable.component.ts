import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { combineLatest, interval, map, startWith } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'observable',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    @if (viewModel$ | async; as viewModel) {
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
})
export class ObservableComponent {
  viewModel$ = combineLatest({
    users: inject(UserService).users$,
    interval: interval(600).pipe(
      map((value) => value % 2 === 0),
      startWith(false)
    ),
  });
}
