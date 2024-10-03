import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, Location } from '@angular/common';
import { Observable } from 'rxjs';

import { ButtonComponent } from '../shared/button/button.component';
import { CodeComponent } from './code/code.component';
import { AnswersComponent } from './answers/answers.component';
import { ApiService } from '../core/api.service';
import { EventService } from '../core/event.service';
import {
  LoadingState,
  toLoadingStateStream,
} from '../shared/loading-state/loading-state';
import { GlobalEvents, Question, QuizParams } from './models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ButtonComponent, CodeComponent, AnswersComponent, AsyncPipe],
  templateUrl: './quiz-screen.component.html',
  styleUrl: './quiz-screen.component.scss',
})
export class QuizScreenComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);

  public quizParams!: QuizParams;
  public questionsLoadingState$!: Observable<LoadingState<Question[]>>;
  public index: number = 0;
  public answers = new Map<number, number | null>();

  public ngOnInit(): void {
    this.quizParams = history.state as QuizParams;

    this.questionsLoadingState$ = toLoadingStateStream<Question[]>(
      this.apiService.getQuestions(this.quizParams),
    );
  }

  public confirmAnswer() {
    if (this.answers.has(this.index)) {
      this.gotoNextQuestion();
    }
  }

  public confirmNoAnswer() {
    this.answers.set(this.index, null);
    this.gotoNextQuestion();
  }

  private gotoNextQuestion() {
    this.index++;
    if (this.index >= this.quizParams.questionsCount) {
      this.router.navigateByUrl('/results', {
        state: {
          results: Array.from(this.answers),
        },
      });
    }
    this.eventService.emit(GlobalEvents.uncheckInputs);
  }
}
