import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';

type colorTheme = 'yellow' | 'gray';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @HostBinding('class')
  @Input()
  public colorTheme: colorTheme = 'yellow';
}
