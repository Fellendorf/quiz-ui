import { Component, inject } from '@angular/core';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';

import { toLoadingStateStream } from '../shared/loading-state/loading-state';
import { ApiService } from '../core/api.service';
import { QuizService } from '../core/quiz.service';
import { AuthService } from '../core/auth.service';
import { LoadingScreenComponent } from '../shared/loading-screen/loading-screen.component';
import { Option, OptionsComponent } from '../shared/options/options.component';
import { ROUTE_PATHES } from '../app.routes';
import { TopicData } from '../models';

@Component({
  selector: 'app-menu-screen',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    UpperCasePipe,
    LoadingScreenComponent,
    OptionsComponent,
  ],
  templateUrl: './menu-screen.component.html',
  styleUrl: './menu-screen.component.scss',
})
export class MenuScreenComponent {
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
  private readonly authService = inject(AuthService);
  public readonly quizService = inject(QuizService);

  public isAdmin$ = of(this.authService.isAdmin);
  public topicsLoadingState$ = toLoadingStateStream<TopicData[]>(
    this.apiService.getTopics(),
  );

  public getTopicOptions(topicData: TopicData[]): Option<string>[] {
    return topicData.map(({ name, questionCount }) => ({
      name,
      info: String(questionCount),
    }));
  }

  public getCountOptions(topicData: TopicData[]): Option<number>[] {
    const defaultOptions = [10, 20, 40];

    const questionCount = topicData.find(
      ({ name }) => name === this.quizService.getTopic(),
    )?.questionCount;

    if (questionCount) {
      const filteredOptions = defaultOptions.filter(
        (option) => option <= questionCount,
      );
      return filteredOptions.length
        ? filteredOptions.map((option) => ({
            name: option,
          }))
        : [{ name: questionCount }];
    }
    return defaultOptions.map((option) => ({
      name: option,
    }));
  }

  public isStartButtonDisabled(topicData: TopicData[]): boolean {
    const currentOptions = this.getCountOptions(topicData).map(
      ({ name }) => name,
    );
    const previousOption = this.quizService.getCount();

    return (
      this.quizService.getTopic() === null ||
      this.quizService.getCount() === null ||
      (!!previousOption && !currentOptions.includes(previousOption))
    );
  }

  public goTo(destination: 'quizScreen' | 'settingsScreen' | 'adminScreen') {
    const queryParams = {
      quizScreen: {
        topic: this.quizService.getTopic(),
        count: this.quizService.getCount(),
      },
      settingsScreen: null,
      adminScreen: null,
    };

    const commands = {
      quizScreen: [ROUTE_PATHES.QUIZ],
      settingsScreen: [ROUTE_PATHES.SETTINGS],
      adminScreen: [ROUTE_PATHES.ADMIN_QUESTIONS, this.quizService.getTopic()],
    };
    return this.router.navigate(commands[destination], {
      queryParams: queryParams[destination],
    });
  }
}
