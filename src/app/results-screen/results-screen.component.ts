import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { QuizService } from '../core/quiz.service';
import { CodeComponent } from '../shared/code/code.component';

@Component({
  selector: 'app-results-screen',
  standalone: true,
  imports: [JsonPipe, CodeComponent, RouterLink],
  templateUrl: './results-screen.component.html',
  styleUrl: './results-screen.component.scss',
})
export class ResultsScreenComponent {
  public readonly quizService = inject(QuizService);
}
