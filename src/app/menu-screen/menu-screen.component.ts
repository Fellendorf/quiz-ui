import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import {
  LoadingState,
  toLoadingStateStream,
} from '../shared/loading-state/loading-state';
import { ApiService } from '../core/api.service';
import { QuizService } from '../core/quiz.service';
import { LoadingScreenComponent } from '../shared/loading-screen/loading-screen.component';
import { TopicOptionsComponent } from './topic-options/topic-options.component';
import { CountOptionsComponent } from './count-options/count-options.component';
import { Topic } from '../models';
import { ROUTE_PATHES } from '../app.routes';

@Component({
  selector: 'app-menu-screen',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    LoadingScreenComponent,
    TopicOptionsComponent,
    CountOptionsComponent,
  ],
  templateUrl: './menu-screen.component.html',
  styleUrl: './menu-screen.component.scss',
})
export class MenuScreenComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
  private readonly quizService = inject(QuizService);

  private readonly quizScreenPath = `/${ROUTE_PATHES.QUIZ}`;
  private readonly settingsScreenPath = `${ROUTE_PATHES.SETTINGS}`;

  public topicsLoadingState$!: Observable<LoadingState<Topic[]>>;

  public ngOnInit(): void {
    this.topicsLoadingState$ = toLoadingStateStream<Topic[]>(
      this.apiService.getTopics(),
    );
  }

  public goToQuizScreen(): void {
    this.router.navigate([this.quizScreenPath]);
  }

  public isStartButtonDisabled(): boolean {
    const quizParams = this.quizService.getQuizParams();
    return quizParams?.topic === undefined || quizParams?.count === undefined;
  }

  public goToSettingsScreen(): void {
    this.router.navigate([this.settingsScreenPath]);
  }
}
