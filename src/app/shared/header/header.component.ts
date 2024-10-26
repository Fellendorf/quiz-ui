import { Location, UpperCasePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

type goToOnClick = 'menu' | 'back';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UpperCasePipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input({ required: true })
  public goToOnClick!: goToOnClick;

  @Input({ required: true })
  public topText!: string;

  @Input()
  public bottomText?: string;

  private readonly location = inject(Location);

  public goBack() {
    this.location.back();
  }
}
