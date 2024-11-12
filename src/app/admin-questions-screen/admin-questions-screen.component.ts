import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { switchMap } from 'rxjs';

import { toLoadingStateStream } from '../shared/loading-state/loading-state';
import { LoadingScreenComponent } from '../shared/loading-screen/loading-screen.component';
import { HeaderComponent } from '../shared/header/header.component';
import { Option, OptionsComponent } from '../shared/options/options.component';
import { ApiService } from '../core/api.service';
import { Question } from '../models';
import { ROUTE_PATHES } from '../app.routes';

@Component({
  selector: 'app-admin-questions-screen',
  standalone: true,
  imports: [
    AsyncPipe,
    UpperCasePipe,
    LoadingScreenComponent,
    OptionsComponent,
    HeaderComponent,
  ],
  templateUrl: './admin-questions-screen.component.html',
  styleUrl: './admin-questions-screen.component.scss',
})
export class AdminQuestionsScreenComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);

  public question = signal<Question | null>(null);

  public questionsLoadingState$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      const topic: string = params['topic'];
      return toLoadingStateStream<Question[]>(
        this.apiService.getQuestions(topic),
      );
    }),
  );

  public getQuestionOptions(
    questions: Question[],
  ): Option<string, string, number>[] {
    return questions.map(({ _id, text }, index) => ({
      id: _id!,
      text,
      info: index + 1,
    }));
  }

  public setQuestion(quesions: Question[], questionId: string): void {
    this.question.set(quesions.find(({ _id }) => _id === questionId) || null);
  }

  public goToEditQuestionScreen() {
    const question = this.question();
    this.router.navigate([
      ROUTE_PATHES.EDIT_QUESTION,
      question ? question?._id : 'new-question',
    ]);
  }
}