import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { QuizService } from '../core/quiz.service';
import { ButtonComponent } from '../shared/button/button.component';
import { CodeComponent } from '../shared/code/code.component';

@Component({
  selector: 'app-results-screen',
  standalone: true,
  imports: [JsonPipe, ButtonComponent, CodeComponent],
  templateUrl: './results-screen.component.html',
  styleUrl: './results-screen.component.scss',
})
export class ResultsScreenComponent {
  public readonly quizService = inject(QuizService);
}
