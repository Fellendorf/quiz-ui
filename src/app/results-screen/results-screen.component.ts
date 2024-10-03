import { JsonPipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-results-screen',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './results-screen.component.html',
  styleUrl: './results-screen.component.scss',
})
export class ResultsScreenComponent {
  public results!: [number, number | null][];

  public ngOnInit(): void {
    this.results = history.state;
  }
}
