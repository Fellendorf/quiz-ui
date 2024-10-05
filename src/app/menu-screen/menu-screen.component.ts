import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import {
  LoadingState,
  toLoadingStateStream,
} from '../shared/loading-state/loading-state';
import { Topic } from '../quiz-screen/models';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-menu-screen',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './menu-screen.component.html',
  styleUrl: './menu-screen.component.scss',
})
export class MenuScreenComponent implements OnInit {
  private readonly apiService = inject(ApiService);

  public topicsLoadingState$!: Observable<LoadingState<Topic[]>>;
  public selectedTopic!: Topic;

  public ngOnInit(): void {
    this.topicsLoadingState$ = toLoadingStateStream<Topic[]>(
      this.apiService.getTopics(),
    );
  }
}
