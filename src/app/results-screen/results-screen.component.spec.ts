import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

import { ResultsScreenComponent } from './results-screen.component';
import { AuthService } from '../core/auth.service';
import { QuizService } from '../core/quiz.service';
import { HeaderComponent } from '../shared/header/header.component';
import { CodeComponent } from '../shared/code/code.component';
import { Question, ROUTE_PATHES } from '../models';
import {
  CodeStubComponent,
  HeaderStubComponent,
  provideAuthServiceMock,
  provideQuizServiceMock,
  provideRouterMock,
} from '../../test/mocks';

describe('ResultsScreenComponent', () => {
  let componentInstance: ResultsScreenComponent;
  let fixture: ComponentFixture<ResultsScreenComponent>;

  const routerMock = provideRouterMock();
  const authServiceMock = provideAuthServiceMock();
  const quizServiceMock = provideQuizServiceMock();

  const questions: Question[] = [
    {
      _id: 'id1',
      subtopic: 'subtopic',
      text: 'question 1 text',
    },
    {
      _id: 'id2',
      text: 'question 2 text',
    },
  ].map((question) => ({
    ...question,
    topic: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    options: [
      { text: 'Option 1', isCorrect: true },
      { text: 'Option 2', isCorrect: true },
      { text: 'Option 3', isCorrect: false },
    ],
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsScreenComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: QuizService,
          useValue: quizServiceMock,
        },
      ],
    })
      .overrideComponent(ResultsScreenComponent, {
        remove: {
          imports: [HeaderComponent, CodeComponent],
        },
        add: {
          imports: [HeaderStubComponent, CodeStubComponent],
        },
      })
      .compileComponents();

    quizServiceMock.questions.and.returnValue(questions);
    quizServiceMock.userAnswers.and.returnValue([]);

    fixture = TestBed.createComponent(ResultsScreenComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('If questions length is 0 (URL was entered without passing a test), then a user will be navigated to the "Main menu" page', () => {
    quizServiceMock.questions.and.returnValue([]);
    componentInstance.ngOnInit();

    expect(routerMock.navigate).toHaveBeenCalledWith([ROUTE_PATHES.MENU]);
  });

  it('The first question from the array of questions is selected by default', () => {
    expect(componentInstance.question()).toEqual(questions[0]);
  });

  it('If a question index is changed, then the question should be changed according to the selected index', () => {
    componentInstance.questionIndex.set(1);

    expect(componentInstance.question()).toEqual(questions[1]);
  });

  it('Should correctly display correct answer text', () => {
    expect(componentInstance.correctAnswerText()).toEqual('Option 1, Option 2');
  });
});
