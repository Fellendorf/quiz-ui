import { UpperCasePipe } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HeaderComponent } from '../shared/header/header.component';
import { TextareaAutoresizeDirective } from '../shared/textarea-autoresize.directive';
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

  public question = signal<Question | null>(null);
  public questionForm!: FormGroup;

  private questionEffect = effect(() => {
    const question = this.question();

    if (question) {
      this.questionForm = this.formBuilder.group({
        _id: [question._id],
        topic: [question.topic, Validators.required],
        text: [question.text, Validators.required],
        code: [question.code],
        options: this.formBuilder.array(
          question.options.map((option) =>
            this.formBuilder.group({
              text: [option.text, Validators.required],
              isCorrect: [option.isCorrect],
            }),
          ),
          Validators.required,
        ),
        explanation: [question.explanation],
        reviewed: [question.reviewed],
        difficult: [question.difficult],
      });
    }
  });

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

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  public addOption(): void {
    this.options.push(this.formBuilder.control(['']));
  }

  public removeOption(index: number): void {
    this.options.removeAt(index);
    this.questionForm.updateValueAndValidity(); // trigger UI update to reflect changes in options array length
  }

  public isAddButtonDisabled(index: number): boolean {
    return (
      this.questionForm.get('options')?.get(String(index))?.get('isCorrect')
        ?.value || this.options.length === 2 // minimum 2 options must be available
    );
  }

  public test() {}

  public onSubmit(): void {
    const modifiedQuestion = this.questionForm.value as Question;
    this.apiService.updateQuestion(modifiedQuestion).subscribe((response) => {
      if (response?.message) {
        alert(response.message);
      }
    });
  }
}
