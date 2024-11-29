import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

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
  let template: HTMLElement;

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
  const userAnswers = [[0, 1], []];

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
    quizServiceMock.userAnswers.and.returnValue(userAnswers);

    fixture = TestBed.createComponent(ResultsScreenComponent);
    componentInstance = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('If questions length is 0 (URL was entered without passing a quiz), then a user will be navigated to the "Main menu" page', () => {
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

  it('The method "correctAnswerText()" should return correct answer text', () => {
    // switch to 1 and back to 0 to trigger "computed" signal:
    componentInstance.questionIndex.set(1);
    componentInstance.questionIndex.set(0);

    expect(componentInstance.correctAnswerText()).toEqual('Option 1, Option 2');
  });

  it('The method "userAnswerText()" should return a user answer text', () => {
    quizServiceMock.getUserAnswer.and.returnValue(userAnswers[0]);
    // switch to 1 and back to 0 to trigger "computed" signal:
    componentInstance.questionIndex.set(1);
    componentInstance.questionIndex.set(0);

    expect(componentInstance.userAnswerText()).toEqual('Option 1, Option 2');
  });

  it('The method "userAnswerText()" should return "Вы не дали ответ" if a user did not provide the answer', () => {
    quizServiceMock.getUserAnswer.and.returnValue(userAnswers[1]);
    componentInstance.questionIndex.set(1);

    expect(componentInstance.userAnswerText()).toEqual('Вы не дали ответ');
  });

  it('The method "formatLinkView()" should return only protocol and host name of the link', () => {
    const url = 'https://some-host.com/some-path/?some-param=0';

    expect(componentInstance.formatLinkView(url)).toEqual(
      'https://some-host.com',
    );
  });

  it('The method "formatLinkView()" should return input parameter as it is if this is not a valid url', () => {
    const url = 'just some string';

    expect(componentInstance.formatLinkView(url)).toEqual('just some string');
  });

  it('If the method "goToQuestionScreen()" is called, then a user will be navigated to the specific question page', () => {
    componentInstance.goToQuestionScreen();

    expect(routerMock.navigate).toHaveBeenCalledWith([
      ROUTE_PATHES.QUESTION,
      componentInstance.question()._id,
    ]);
  });

  it('The template should display expected number of question buttons (the same as the number of questions)', () => {
    expect(template.querySelector('.question-buttons')?.childElementCount).toBe(
      2,
    );
  });
});
