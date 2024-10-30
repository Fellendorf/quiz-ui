import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { of } from 'rxjs';

import { CodeComponent } from '../shared/code/code.component';
import { HeaderComponent } from '../shared/header/header.component';
import { QuizService } from '../core/quiz.service';
import { AuthService } from '../core/auth.service';
import { ROUTE_PATHES } from '../app.routes';
import { Question } from '../models';

@Component({
  selector: 'app-results-screen',
  standalone: true,
  imports: [
    UpperCasePipe,
    AsyncPipe,
    CodeComponent,
    HeaderComponent,
    RouterLink,
  ],
  templateUrl: './results-screen.component.html',
  styleUrl: './results-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsScreenComponent {
  private readonly router = inject(Router);
  private readonly quizService = inject(QuizService);
  private readonly authService = inject(AuthService);

  public isAdmin$ = of(this.authService.isAdmin); // change to signal

  public questions = this.quizService.questions;
  public userAnswers = this.quizService.userAnswers;
  public getUserAnswer = this.quizService.getUserAnswer;
  public getCorrectQuestionCount = this.quizService.getCorrectQuestionCount;

  constructor() {
    if (!this.questions().length) {
      this.router.navigate([ROUTE_PATHES.MENU]);
    }
  }

  public index = signal(0);
  public question = computed(() => this.questions()[this.index()]);

  public correctAnswerText = computed(() => {
    const questions = this.question();
    return questions.options[questions.answer.index];
  });
  public userAnswerText = computed(() => {
    const userAnswer = this.getUserAnswer(this.index());
    return userAnswer >= 0
      ? this.question().options[userAnswer]
      : 'Вы не дали ответ';
  });

  public setQuestion(index: number): void {
    this.index.set(index);
  }

  public setColor(question: Question, index: number): 'green' | 'red' {
    return question.answer.index === this.userAnswers()[index]
      ? 'green'
      : 'red';
  }

  public isQuestionChecked(index: number): boolean {
    return this.index() === index;
  }

  public goToEditQuestionScreen() {
    this.router.navigate([ROUTE_PATHES.EDIT_QUESTION, this.question()._id]);
  }
}
