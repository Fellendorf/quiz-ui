import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs';

import { toLoadingStateStream } from '../shared/loading-state/loading-state';
import { LoadingScreenComponent } from '../shared/loading-screen/loading-screen.component';
import { ApiService } from '../core/api.service';
import { Question } from '../models';

@Component({
  selector: 'app-admin-questions-screen',
  standalone: true,
  imports: [AsyncPipe, LoadingScreenComponent],
  templateUrl: './admin-questions-screen.component.html',
  styleUrl: './admin-questions-screen.component.scss',
})
export class AdminQuestionsScreenComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);

  public questionsLoadingState$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      const topic: string = params['topic'];
      return toLoadingStateStream<Question[]>(
        this.apiService.getQuestions(topic),
      );
    }),
  );
}
