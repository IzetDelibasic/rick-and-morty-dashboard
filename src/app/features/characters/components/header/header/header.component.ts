import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AVATAR_IMAGE } from '../../../../../constants/contentConstants/imageConstant';
import { RmButtonComponent } from '../../../../../shared/components/button/rm-button/rm-button.component';

@Component({
  selector: 'rm-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, RmButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class RmHeaderComponent {
  avatarImage = AVATAR_IMAGE;
}
