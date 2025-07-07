import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RmHeaderComponent } from './features/characters/components/header/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RmHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rick-and-morty-dashboard';
}
