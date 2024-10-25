import { Component, inject } from '@angular/core';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';

import { toLoadingStateStream } from '../shared/loading-state/loading-state';
import { ApiService } from '../core/api.service';
import { QuizService } from '../core/quiz.service';
import { AuthService } from '../core/auth.service';
import { LoadingScreenComponent } from '../shared/loading-screen/loading-screen.component';
import { TopicOptionsComponent } from './topic-options/topic-options.component';
import { CountOptionsComponent } from './count-options/count-options.component';
import { ROUTE_PATHES } from '../app.routes';
import { Topic } from '../models';

@Component({
  selector: 'app-menu-screen',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    UpperCasePipe,
    LoadingScreenComponent,
    TopicOptionsComponent,
    CountOptionsComponent,
  ],
  templateUrl: './menu-screen.component.html',
  styleUrl: './menu-screen.component.scss',
})
export class MenuScreenComponent {
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
  private readonly quizService = inject(QuizService);
  private readonly authService = inject(AuthService);

  public isAdmin$ = of(this.authService.isAdmin);

  public topicsLoadingState$ = toLoadingStateStream<Topic[]>(
    this.apiService.getTopics(),
  );

  public isStartButtonDisabled(): boolean {
    const quizParams = this.quizService.getQuizParams();
    return quizParams?.topic === undefined || quizParams?.count === undefined;
  }

  public goToQuizScreen(): void {
    this.router.navigate([ROUTE_PATHES.QUIZ]);
  }

  public goToSettingsScreen(): void {
    this.router.navigate([ROUTE_PATHES.SETTINGS]);
  }

  public goToEditQuestionsScreen(): void {
    const quizParams = this.quizService.getQuizParams();
    this.router.navigate([ROUTE_PATHES.ADMIN_QUESTIONS, quizParams.topic]);
  }
}
