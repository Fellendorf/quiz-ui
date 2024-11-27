import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

import { CodeComponent } from '../shared/code/code.component';
import { HeaderComponent } from '../shared/header/header.component';
import { QuizService } from '../core/quiz.service';
import { AuthService } from '../core/auth.service';
import { ROUTE_PATHES } from '../models';

@Component({
  selector: 'app-results-screen',
  standalone: true,
  imports: [UpperCasePipe, CodeComponent, HeaderComponent],
  templateUrl: './results-screen.component.html',
  styleUrl: './results-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsScreenComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly quizService = inject(QuizService);
  private readonly authService = inject(AuthService);

  public isAdmin = this.authService.isAdmin;

  public questions = this.quizService.questions;
  public userAnswers = this.quizService.userAnswers;
  public getUserAnswer = this.quizService.getUserAnswer;
  public getCorrectQuestionCount = this.quizService.getCorrectQuestionCount;
  public isUserAnswerCorrect = this.quizService.isUserAnswerCorrect;

  public ngOnInit() {
    if (!this.questions().length) {
      this.router.navigate([ROUTE_PATHES.MENU]);
    }
  }

  public questionIndex = signal(0);
  public question = computed(() => this.questions()[this.questionIndex()]);

  public correctAnswerText = computed(() => {
    return this.question()
      .options.filter((option) => option.isCorrect)
      .map(({ text }) => text)
      .join(', ');
  });

  public userAnswerText = computed(() => {
    const userAnswer = this.getUserAnswer(this.questionIndex());

    return userAnswer?.length
      ? this.question()
          .options.filter((option, index) => userAnswer.includes(index))
          .map(({ text }) => text)
          .join(', ')
      : 'Вы не дали ответ';
  });

  public isQuestionChecked(index: number): boolean {
    return this.questionIndex() === index;
  }

  public formatLinkView(link: string): string {
    return link.match(/^(https:\/\/.*?)\//)?.[1] || link;
  }

  public goToQuestionScreen() {
    this.router.navigate([ROUTE_PATHES.QUESTION, this.question()._id]);
  }
}
