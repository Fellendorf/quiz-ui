import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-screen',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './menu-screen.component.html',
  styleUrl: './menu-screen.component.scss',
})
export class MenuScreenComponent {}
