import { Component } from '@angular/core';
import { QuestionComponent } from './question/question.component';
import { Question } from './models';
import { ButtonComponent } from '../shared/button/button.component';
import { ApiService } from '../core/api.service';
import hljs from 'highlight.js';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [QuestionComponent, ButtonComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  public questions!: Question[];
  public index: number = 0;
  public topic: string = 'Angular';
  public isLoading: boolean = true;

  constructor(private readonly apiService: ApiService) {}

  public submitAnswer() {
    console.log('submitAnswer');
  }

  public submitNoAnswer() {
    console.log('submitNoAnswer');
  }

  public ngOnInit() {
    this.apiService.getQuestions(this.topic).subscribe((response) => {
      this.questions = response;
      this.isLoading = false;
    });
  }

  public test(event: number): void {
    console.log(event);
  }
}
