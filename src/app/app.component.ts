import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fromEvent, map, merge } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public isMobileLandscapeOrientation$ = merge(
    fromEvent(window, 'load'),
    fromEvent(window, 'orientationchange'),
  ).pipe(
    map(() =>
      this.isMobileLandscapeOrientation(
        navigator.userAgent,
        screen.orientation.type,
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
