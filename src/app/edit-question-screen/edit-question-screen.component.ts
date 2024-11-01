import { UpperCasePipe } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HeaderComponent } from '../shared/header/header.component';
import { TextareaAutoresizeDirective } from '../shared/textarea-autoresize.directive';
import { QuizService } from '../core/quiz.service';
import { ApiService } from '../core/api.service';
import { ROUTE_PATHES } from '../app.routes';
import { Question } from '../models';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-question-screen',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    UpperCasePipe,
    TextareaAutoresizeDirective,
    HeaderComponent,
  ],
  templateUrl: './edit-question-screen.component.html',
  styleUrl: './edit-question-screen.component.scss',
})
export class EditQuestionScreenComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly apiService = inject(ApiService);
  private readonly quizService = inject(QuizService);

  public question = signal<Question | null>(null);

  private questionEffect = effect(() => {
    console.log(this.question());
    const question = this.question()!;
    if (question) {
      this.questionForm = this.formBuilder.group({
        _id: [question._id],
        topic: [question.topic],
        text: [question.text, Validators.required],
        code: [question.code],
        options: [question.options],
        answer: this.formBuilder.group({
          index: [question.answer.index],
          explanation: [question.answer.explanation],
        }),
      });
    }
  });

  public questionForm!: FormGroup;

  public async ngOnInit(): Promise<void> {
    this.activatedRoute.params
      .pipe(switchMap((params) => this.apiService.getQuestion(params['id'])))
      .subscribe((question: Question) => {
        if (!question) {
          this.router.navigate([ROUTE_PATHES.MENU]);
          return;
        }
        this.question.set(question);
      });
  }

  public getTopic(): string {
    return this.questionForm.get('topic')?.value;
  }

  public getAnswer(): string {
    const options = this.questionForm.get('options')?.value;
    const index = this.questionForm.get('answer')?.get('index')?.value;
    return options[index];
  }

  public onSubmit(): void {
    const modifiedQuestion = this.questionForm.value as Question;
    this.apiService.updateQuestion(modifiedQuestion).subscribe((response) => {
      if (response?.message) {
        alert(response.message);
      }
    });
  }
}
