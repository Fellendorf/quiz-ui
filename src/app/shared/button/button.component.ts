import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';

type buttonColorTheme = 'yellow' | 'gray';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {
  @Input() public colorTheme: buttonColorTheme = 'yellow';
  @HostBinding('class') public _class!: string;

  ngOnInit() {
    this._class = this.colorTheme;
  }
}
