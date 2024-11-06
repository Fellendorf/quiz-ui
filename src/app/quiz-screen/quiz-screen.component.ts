import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';

import { toLoadingStateStream } from '../shared/loading-state/loading-state';
import { CodeComponent } from '../shared/code/code.component';
import { OptionsComponent } from './options/options.component';
import { HeaderComponent } from '../shared/header/header.component';
import { LoadingScreenComponent } from '../shared/loading-screen/loading-screen.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ApiService } from '../core/api.service';
import { EventService } from '../core/event.service';
import { QuizService } from '../core/quiz.service';
import { GlobalEvents, Question } from '../models';
import { ROUTE_PATHES } from '../app.routes';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CodeComponent,
    OptionsComponent,
    LoadingScreenComponent,
    ProgressBarComponent,
    HeaderComponent,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './quiz-screen.component.html',
  styleUrl: './quiz-screen.component.scss',
})
export class QuizScreenComponent {
  private readonly apiService = inject(ApiService);
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly quizService = inject(QuizService);

  public userAnswers = this.quizService.userAnswers;
  public setUserAnswer = this.quizService.setUserAnswer;
  public isAnswerProvided = this.quizService.isAnswerProvided;

  public questionIndex: number = 0;

  public questionsLoadingState$ = this.activatedRoute.queryParams.pipe(
    switchMap((params) => {
      const topic = params['topic'];
      const count = params['count'];
      return toLoadingStateStream<Question[]>(
        this.apiService.getQuestions(topic, count).pipe(
          map((questions) => this.shuffleOptions(questions)),
          tap((questions) => {
            this.quizService.questions.set(questions);
            this.quizService.resetUserAnswers();
          }),
        ),
      );
    }),
  );

  public confirmAnswer() {
    if (this.quizService.isAnswerProvided(this.questionIndex)) {
      this.goToNextQuestion();
    } else {
      alert('Please, choose answer');
    }
  }

  public confirmNoAnswer() {
    this.quizService.setUserAnswer(this.questionIndex, []);
    this.goToNextQuestion();
  }

  private goToNextQuestion() {
    this.questionIndex++;
    if (
      this.questionIndex >=
      Number(this.activatedRoute.snapshot.queryParamMap.get('count'))
    ) {
      this.router.navigate([ROUTE_PATHES.RESULTS]);
    }
    this.eventService.emit(GlobalEvents.questionChanged);
  }

  private shuffleOptions(questions: Question[]) {
    return questions.map((question) => {
      const options = question.options;
      const shuffledOptions = [...options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        console.log('i:', i, 'j: ', j);
        [shuffledOptions[i], shuffledOptions[j]] = [
          shuffledOptions[j],
          shuffledOptions[i],
        ];
      }
      return { ...question, options: shuffledOptions };
    });
  }
}
