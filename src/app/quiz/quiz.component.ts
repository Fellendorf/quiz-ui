import { Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { QuestionComponent } from './question/question.component';
import { ButtonComponent } from '../shared/button/button.component';
import { ApiService } from '../core/api.service';
import { toLoadingStateStream } from '../shared/loading-state/loading-state';
import { Question } from './models';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [QuestionComponent, ButtonComponent, AsyncPipe],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  @Input() public topic!: string;
  @Input() public questionsCount?: number;
  @Input() public isRandom?: boolean;

  public questionsLoadingState$ = toLoadingStateStream<Question[]>(
    this.apiService.getQuestions(this.topic, this.questionsCount, this.isRandom)
  );
  public index: number = 0;

  constructor(private readonly apiService: ApiService) {}

  public submitAnswer() {
    console.log('submitAnswer');
  }

  public submitNoAnswer() {
    console.log('submitNoAnswer');
  }

  public test(event: number): void {
    console.log(event);
  }
}
