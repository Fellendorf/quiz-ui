import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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
  private readonly router = inject(Router);
  public readonly quizService = inject(QuizService);

  public ngOnInit() {
    if (!this.quizService.questions) {
      this.router.navigateByUrl('/');
    }
  }

  public getNumberCorrectAnswers(): number {
    return this.quizService.questions.filter(
      (question) => question.answer.index === question.userAnswer,
    ).length;
  }
}
