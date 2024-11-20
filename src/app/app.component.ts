import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fromEvent, map, merge } from 'rxjs';
import { NAVIGATOR, SCREEN } from './shared/customTokens';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly navigator = inject(NAVIGATOR);
  private readonly screen = inject(SCREEN);

  public isMobileLandscapeOrientation$ = merge(
    fromEvent(window, 'load'),
    fromEvent(window, 'orientationchange'),
  ).pipe(
    map(() =>
      this.isMobileLandscapeOrientation(
        this.navigator.userAgent,
        this.screen.orientation.type,
      ),
    ),
  );

  private isMobileLandscapeOrientation(
    userAgent: string,
    orientationType: string,
  ) {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
        userAgent,
      ) && /landscape/i.test(orientationType)
    );
  }
}
