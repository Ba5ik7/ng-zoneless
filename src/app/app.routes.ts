import { Routes } from '@angular/router';
import { appResolver } from './app.resolver';

export const routes: Routes = [
  {
    path: '',
    resolve: { appResolver },
    children: [
      {
        path: 'signals',
        loadComponent: () =>
          import('./components/signals.component').then(
            (c) => c.SignalsComponent
          ),
      },
      {
        path: 'observable',
        loadComponent: () =>
          import('./components/observable.component').then(
            (c) => c.ObservableComponent
          ),
      },
      {
        path: 'interop',
        loadComponent: () =>
          import('./components/interop.component').then(
            (c) => c.InteropComponent
          ),
      },
    ],
  },
];
