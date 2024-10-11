import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { CodeComponent } from '../shared/code/code.component';
import { AnswersComponent } from './answers/answers.component';
import { ApiService } from '../core/api.service';
import { EventService } from '../core/event.service';
import {
  LoadingState,
  toLoadingStateStream,
} from '../shared/loading-state/loading-state';
import { QuizService } from '../core/quiz.service';
import { GlobalEvents, Question, QuizParams } from './models';
import { LoadingScreenComponent } from '../shared/loading-screen/loading-screen.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CodeComponent,
    AnswersComponent,
    LoadingScreenComponent,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './quiz-screen.component.html',
  styleUrl: './quiz-screen.component.scss',
})
export class QuizScreenComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly eventService = inject(EventService);
  public readonly quizService = inject(QuizService);
  private readonly router = inject(Router);

  public quizParams!: QuizParams;
  public questionsLoadingState$!: Observable<LoadingState<Question[]>>;
  public index: number = 0;
  public answers = new Map<number, number | null>();

  public ngOnInit(): void {
    this.quizParams = history.state.quizParams as QuizParams;
    if (!this.quizParams) {
      this.router.navigateByUrl('/');
    }

    this.questionsLoadingState$ = toLoadingStateStream<Question[]>(
      this.apiService
        .getQuestions(this.quizParams)
        .pipe(tap((questions) => (this.quizService.questions = questions))),
    );
  }

  public confirmAnswer() {
    if (this.quizService.isAnswered(this.index)) {
      this.gotoNextQuestion();
    } else {
      console.log('Choose answer');
      //TODO: let a user know somehow
    }
  }

  public confirmNoAnswer() {
    this.quizService.setAnswer(this.index, null);
    this.gotoNextQuestion();
  }

  private gotoNextQuestion() {
    this.index++;
    if (this.index >= this.quizParams.questionsCount) {
      this.router.navigateByUrl('/results');
    }
    this.eventService.emit(GlobalEvents.uncheckInputs);
  }
}
