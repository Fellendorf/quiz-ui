import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { QuizService } from '../core/quiz.service';
import { CodeComponent } from '../shared/code/code.component';
import { Question } from '../models';

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

  public index = 0;
  public question!: Question;

  public ngOnInit() {
    if (!this.quizService.questions) {
      this.router.navigateByUrl('/');
    }
    this.question = this.quizService.questions[this.index];
  }

  public getNumberCorrectAnswers(): number {
    return this.quizService.questions.filter(
      (question) => question.answer.index === question.userAnswer,
    ).length;
  }

  public setQuestion(index: number): void {
    this.index = index;
    this.question = this.quizService.questions[index];
  }

  public setColor(question: Question) {
    return question.answer.index === question.userAnswer ? 'green' : 'red';
  }

  public isQuestionChecked(index: number): boolean {
    return this.index === index;
  }
}
