import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-screen',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-screen.component.html',
  styleUrl: './menu-screen.component.scss',
})
export class MenuScreenComponent {}
