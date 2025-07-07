import { Routes } from '@angular/router';
import { CharactersListPageComponent } from './pages/characters-list/characters-list-page/characters-list-page.component';
import { CharacterDetailsPageComponent } from './pages/characters-list/character-details-page/character-details-page.component';

export const charactersRoutes: Routes = [
  {
    path: 'characters',
    component: CharactersListPageComponent,
  },
  {
    path: 'characters/:id',
    component: CharacterDetailsPageComponent,
  },
];
