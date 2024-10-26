import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from '../core/quiz.service';
import { Question } from '../models';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../core/api.service';
import { TextareaAutoresizeDirective } from '../shared/textarea-autoresize.directive';
import { HeaderComponent } from '../shared/header/header.component';

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

  public questionForm!: FormGroup;

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const question = this.quizService.questions?.find(
        (question) => question._id === params['id'],
      );

      if (!question) {
        this.router.navigateByUrl('/');
        return;
      }
      this.questionForm = this.formBuilder.group({
        _id: [params['id']],
        topic: [question.topic],
        text: [question.text, Validators.required],
        code: [question.code],
        options: [question.options],
        answer: this.formBuilder.group({
          index: [question.answer.index],
          explanation: [question.answer.explanation],
        }),
      });
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
    this.apiService.updateQuestion(modifiedQuestion).subscribe(() => {
      this.quizService.questions = this.quizService.questions.map((question) =>
        modifiedQuestion._id === question._id ? modifiedQuestion : question,
      );
      this.router.navigateByUrl('/results');
    });
  }
}
