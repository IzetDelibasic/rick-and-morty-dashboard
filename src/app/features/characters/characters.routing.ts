import { Routes } from '@angular/router';
import { CharactersListPageComponent } from './pages/characters-list/characters-list-page/characters-list-page.component';

export const charactersRoutes: Routes = [
  {
    path: 'characters',
    component: CharactersListPageComponent,
  },
];
