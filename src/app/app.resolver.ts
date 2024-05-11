import type { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './services/user.interface';
import { inject } from '@angular/core';
import { UserService } from './services/user.service';

export const appResolver: ResolveFn<Observable<User[]>> = () => {
  return inject(UserService).fetchUsers$;
};
