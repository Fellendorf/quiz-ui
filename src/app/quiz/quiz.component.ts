import { Component, inject, Input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
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

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ButtonComponent, CodeComponent, AnswersComponent, AsyncPipe],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  @Input() public quizParams!: QuizParams;

  private readonly apiService = inject(ApiService);
  private readonly eventService = inject(EventService);

  public questionsLoadingState$!: Observable<LoadingState<Question[]>>;
  public index: number = 0;
  public answers = new Map<number, number | null>();

  public ngOnInit(): void {
    this.questionsLoadingState$ = toLoadingStateStream<Question[]>(
      this.apiService.getQuestions(this.quizParams),
    );
    this.eventService
      .listen(GlobalEvents.answer)
      ?.subscribe((answerIndex: number) => {
        this.answers.set(this.index, answerIndex);
      });
  }

  public confirmAnswer() {
    if (this.answers.has(this.index)) {
      console.log('confirmAnswer', this.answers);
      this.gotoNextQuestion();
    }
  }

  public confirmNoAnswer() {
    this.answers.set(this.index, null);
    console.log('confirmNoAnswer', this.answers);
    this.gotoNextQuestion();
  }

  private gotoNextQuestion() {
    this.index++;
    if (this.index >= this.quizParams.questionsCount) {
      // TODO: redirect to the results-screen
      console.log('Quiz complited');
    }
    this.eventService.emit(GlobalEvents.uncheckInputs);
  }
}
