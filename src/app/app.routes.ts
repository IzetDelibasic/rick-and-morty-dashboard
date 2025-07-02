import { Routes } from '@angular/router';
import { charactersRoutes } from './features/characters/characters.routing';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full',
  },
  ...charactersRoutes,
];
