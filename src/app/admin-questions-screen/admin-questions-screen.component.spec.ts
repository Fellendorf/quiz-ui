import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { AdminQuestionsScreenComponent } from './admin-questions-screen.component';
import { Option, OptionsComponent } from '../shared/options/options.component';
import { LoadingScreenComponent } from '../shared/loading-screen/loading-screen.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ApiService } from '../core/api.service';
import { Question, ROUTE_PATHES } from '../models';
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
  let template: HTMLElement;

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
      imports: [AdminQuestionsScreenComponent],
      providers: [
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
    })
      .overrideComponent(AdminQuestionsScreenComponent, {
        remove: {
          imports: [LoadingScreenComponent, HeaderComponent, OptionsComponent],
        },
        add: {
          imports: [
            LodaingScreenStubComponent,
            HeaderStubComponent,
            OptionsStubComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AdminQuestionsScreenComponent);
    componentInstance = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('If "questionsLoadingState$" returns "loading" state, then "Loading screen" is displayed', () => {
    componentInstance.questionsLoadingState$ = of({
      type: 'loading',
    });
    fixture.detectChanges();

    expect(template.querySelector('app-loading-screen')).toBeTruthy();
    expect(template.querySelector('app-header')).toBeFalsy();
    expect(template.querySelector('app-options')).toBeFalsy();
  });

  it('If "questionsLoadingState$" returns "loaded" state, then loaded data and page displayed', () => {
    componentInstance.questionsLoadingState$ = of({
      type: 'loaded',
      data: [],
    });
    fixture.detectChanges();

    expect(template.querySelector('app-loading-screen')).toBeFalsy();
    expect(template.querySelector('app-header')).toBeTruthy();
    expect(template.querySelector('app-options')).toBeTruthy();
  });

  xit('TODO: If "questionsLoadingState$" returns "error" state, then "Some Error Component" should be displayed', () => {
    componentInstance.questionsLoadingState$ = of({
      type: 'error',
      error: new Error(''),
    });
    fixture.detectChanges();

    expect('Some "Error Component"').toBeTruthy();
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
