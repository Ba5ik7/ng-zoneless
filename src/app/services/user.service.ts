import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { User } from "./user.interface";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersSignal = signal<User[]>([]);

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  fetchUsers$ = inject(HttpClient).get<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  ).pipe(
    tap((users) => this.usersSubject.next(users)),
    tap((users) => this.usersSignal.set(users))
  );
}
