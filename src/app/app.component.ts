import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public isMessageDisplayed = false;

  public ngOnInit() {
    this.isMessageDisplayed = this.shouldMessageBeDisplayed();
  }

  @HostListener('window:orientationchange', ['$event'])
  private onOrientationChange(event: Event) {
    this.isMessageDisplayed = this.shouldMessageBeDisplayed();
  }

  private shouldMessageBeDisplayed() {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
        navigator.userAgent,
      ) && /landscape/i.test(screen.orientation.type)
    );
  }
}
