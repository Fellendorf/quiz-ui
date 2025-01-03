import { Location, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HeaderComponent } from '../shared/header/header.component';
import { TextareaAutoresizeDirective } from '../shared/textarea-autoresize.directive';
import { ApiService } from '../core/api.service';
import { ROUTE_PATHES } from '../models';
import { Question } from '../models';
import { iif, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-question-screen',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UpperCasePipe,
    TextareaAutoresizeDirective,
    HeaderComponent,
  ],
  templateUrl: './question-screen.component.html',
  styleUrl: './question-screen.component.scss',
})
export class QuestionScreenComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly formBuilder = inject(FormBuilder);
  private readonly apiService = inject(ApiService);

  public mode = signal<'new' | 'edit'>('new');

  public question = signal<Question | null>(null);
  public questionForm!: FormGroup;

  private questionEffect = effect(() => {
    const question = this.question();

    if (question) {
      this.questionForm = this.formBuilder.group({
        _id: [question._id],
        topic: [question.topic, Validators.required],
        subtopic: [question.subtopic],
        text: [question.text, Validators.required],
        code: this.formBuilder.group(
          {
            text: [question.code?.text],
            language: [question.code?.language],
          },
          {
            validators: [
              (formGroup: AbstractControl) =>
                formGroup.value.text
                  ? Validators.required(formGroup.get('language')!)
                  : formGroup.value.language
                    ? Validators.required(formGroup.get('text')!)
                    : null,
            ],
          },
        ),
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
        links: this.formBuilder.array(
          question.links?.map((link) => this.formBuilder.control(link)) ?? [],
        ),
        reviewed: [question.reviewed],
        difficult: [question.difficult],
      });
    }
  });

  public async ngOnInit(): Promise<void> {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          if (params['id'] === 'new') {
            return of({
              topic: '',
              text: '',
              options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
              ],
            } as Question);
          } else {
            this.mode.set('edit');
            return this.apiService.getQuestion(params['id']);
          }
        }),
      )
      .subscribe((question: Question) => {
        if (!question) {
          this.router.navigate([ROUTE_PATHES.MENU]);
          return;
        }
        this.question.set(question);
      });
  }

  get links() {
    return this.questionForm.get('links') as FormArray;
  }

  public addEmptyLink(): void {
    this.links.push(this.formBuilder.control(''));
  }

  public removeLink(index: number): void {
    this.links.removeAt(index);
  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  public addOption(): void {
    this.options.push(
      this.formBuilder.group({
        text: ['', Validators.required],
        isCorrect: [false],
      }),
    );
  }

  public removeOption(index: number): void {
    this.options.removeAt(index);
  }

  public isRemoveButtonDisabled(index: number): boolean {
    return (
      this.options?.get(String(index))?.get('isCorrect')?.value ||
      this.options.length === 2 // minimum 2 options must be available
    );
  }

  public isSaveButtonDisabled(): boolean {
    return this.questionForm.invalid;
  }

  public uncheckLanguage(language: string): void {
    if (language === this.questionForm.value.code.language) {
      this.questionForm.get('code')?.get('language')?.setValue(null);
    }
  }

  public submitQuestion(displayMessage: boolean): void {
    const modifiedQuestion = this.questionForm.value as Question;
    Object.keys(modifiedQuestion).forEach((key) => {
      if (!modifiedQuestion[key as keyof Question]) {
        delete modifiedQuestion[key as keyof Question];
      }
    });
    // TODO: try to move the logic below to the form control:
    if (!modifiedQuestion.code?.text && !modifiedQuestion.code?.language) {
      delete modifiedQuestion.code;
    }
    if (this.mode() === 'new') {
      delete modifiedQuestion['_id'];
    }
    iif(
      () => this.mode() === 'new',
      this.apiService.createQuestion(modifiedQuestion),
      this.apiService.updateQuestion(modifiedQuestion),
    ).subscribe((response) => {
      if (displayMessage) {
        if (response?.message) {
          alert(response.message);
        }
      } else {
        this.location.back();
      }
    });
  }
}
