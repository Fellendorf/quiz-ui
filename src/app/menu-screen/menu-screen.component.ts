import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { toLoadingStateStream } from '../shared/loading-state/loading-state';
import { ApiService } from '../core/api.service';
import { QuizService } from '../core/quiz.service';
import { AuthService } from '../core/auth.service';
import { LoadingScreenComponent } from '../shared/loading-screen/loading-screen.component';
import { Option, OptionsComponent } from '../shared/options/options.component';
import { ROUTE_PATHES } from '../models';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuScreenComponent {
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
  private readonly authService = inject(AuthService);
  private readonly quizService = inject(QuizService);

  public isAdmin = this.authService.isAdmin;
  public topicsLoadingState$ = toLoadingStateStream<TopicData[]>(
    this.apiService.getTopics(),
  );

  public topic = this.quizService.topic;
  public count = this.quizService.count;

  public getTopicOptions(
    topicData: TopicData[],
  ): Option<string, string, number>[] {
    return topicData.map(({ name, questionCount }) => ({
      id: name,
      text: name,
      info: questionCount,
    }));
  }

  public getCountOptions(
    topicData: TopicData[],
  ): Option<number, number, null>[] {
    const defaultOptions = [10, 20, 40];

    const questionCount = topicData.find(
      ({ name }) => name === this.topic(),
    )!.questionCount;

    return [
      ...defaultOptions
        .filter((option) => option < questionCount)
        .map((option) => ({
          id: option,
          text: option,
        })),
      { id: questionCount, text: questionCount },
    ];
  }

  public isStartButtonDisabled(topicData: TopicData[]): boolean {
    return (
      this.topic() === null ||
      this.count() === null ||
      this.isPreviousOptionInCurrentOptions(topicData)
    );
  }

  private isPreviousOptionInCurrentOptions(topicData: TopicData[]) {
    const currentOptions = this.getCountOptions(topicData).map(
      ({ text }) => text,
    );
    const previousOption = this.count();

    return !!previousOption && !currentOptions.includes(previousOption);
  }

  public goTo(destination: 'quizScreen' | 'settingsScreen' | 'adminScreen') {
    const queryParams = {
      quizScreen: {
        topic: this.topic(),
        count: this.count(),
      },
      settingsScreen: null,
      adminScreen: null,
    };

    const commands = {
      quizScreen: [ROUTE_PATHES.QUIZ],
      settingsScreen: [ROUTE_PATHES.SETTINGS],
      adminScreen: [ROUTE_PATHES.ADMIN_QUESTIONS, this.topic()],
    };
    return this.router.navigate(commands[destination], {
      queryParams: queryParams[destination],
    });
  }
}
