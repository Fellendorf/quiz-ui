import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AdminQuestionsScreenComponent } from './admin-questions-screen.component';
import { ApiService } from '../core/api.service';
import { Question, ROUTE_PATHES } from '../models';
import { Option } from '../shared/options/options.component';
import {
  HeaderStubComponent,
  LodaingScreenStubComponent,
  OptionsStubComponent,
  activatedRouteMock,
  routerMock,
  apiServiceMock,
} from '../../test/mocks';

describe('AdminQuestionsScreenComponent', () => {
  let componentInstance: AdminQuestionsScreenComponent;
  let fixture: ComponentFixture<AdminQuestionsScreenComponent>;

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
    options: [{ text: '', isCorrect: true }],
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminQuestionsScreenComponent,
        HeaderStubComponent,
        OptionsStubComponent,
        LodaingScreenStubComponent,
      ],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
        {
          provide: ApiService,
          useValue: apiServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminQuestionsScreenComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('The "getQuestionOptions()" method should convert questions to options', () => {
    const expectedOptions: Option<string, string, number>[] = [
      {
        id: 'id1',
        text: 'subtopic:\nquestion 1 text',
        info: 1,
      },
      {
        id: 'id2',
        text: 'W/o subtopic:\nquestion 2 text',
        info: 2,
      },
    ];

    expect(componentInstance.getQuestionOptions(questions)).toEqual(
      expectedOptions,
    );
  });

  it('The "setQuestion()" method should set a question', () => {
    const setQuestionSpy = spyOn(componentInstance.question, 'set');
    componentInstance.setQuestion(questions, 'id1');

    expect(setQuestionSpy).toHaveBeenCalledWith(questions[0]);
  });

  it('The "setQuestion()" method should set a null if questions is not found', () => {
    const setQuestionSpy = spyOn(componentInstance.question, 'set');
    componentInstance.setQuestion(questions, 'fakeId');

    expect(setQuestionSpy).toHaveBeenCalledWith(null);
  });

  it('The "goToQuestionScreen()" method should navigate to "create a new question" page', () => {
    componentInstance.goToQuestionScreen('new');

    expect(routerMock.navigate).toHaveBeenCalledWith([
      ROUTE_PATHES.QUESTION,
      'new',
    ]);
  });

  it('The "goToQuestionScreen()" method should navigate to "edit question" page', () => {
    spyOn(componentInstance, 'question').and.returnValue(questions[0]);
    componentInstance.goToQuestionScreen('edit');

    expect(routerMock.navigate).toHaveBeenCalledWith([
      ROUTE_PATHES.QUESTION,
      questions[0]._id,
    ]);
  });
});
