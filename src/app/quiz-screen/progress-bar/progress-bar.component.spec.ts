import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';

import { ProgressBarComponent } from './progress-bar.component';
import {
  provideChangeDetectorRefMock,
  provideEventServiceMock,
  provideQuizServiceMock,
} from '../../../test/mocks';
import { QuizService } from '../../core/quiz.service';
import { EventService } from '../../core/event.service';

describe('ProgressBarComponent', () => {
  let componentInstance: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  const cdrMock = provideChangeDetectorRefMock();
  const quizServiceMock = provideQuizServiceMock();
  const eventServiceMock = provideEventServiceMock();

  const questionChangedEvent = new Subject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent],
      providers: [
        { provide: QuizService, useValue: quizServiceMock },
        {
          provide: ChangeDetectorRef,
          useValue: cdrMock,
        },
        { provide: EventService, useValue: eventServiceMock },
      ],
    }).compileComponents();

    eventServiceMock.listen.and.returnValue(
      questionChangedEvent.asObservable(),
    );
    fixture = TestBed.createComponent(ProgressBarComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('When event "questionChanged" is emitted, then method "cdr.markForCheck() should be invoked', () => {
    const markForCheckSpy = spyOn(componentInstance['cdr'], 'markForCheck');
    questionChangedEvent.next(null);

    expect(markForCheckSpy).toHaveBeenCalled();
  });

  describe('The method "setState() should', () => {
    beforeEach(() => {
      componentInstance.userAnswers = [[]];
    });

    it('String "untouched" if a user answer is not defined', () => {
      expect(componentInstance.setState(1)).toBe('untouched');
    });

    it('String "correct" if a user answer is correct', () => {
      quizServiceMock.isUserAnswerCorrect.and.returnValue(true);

      expect(componentInstance.setState(0)).toBe('correct');
    });

    it('String "incorrect" if a user answer is not correct', () => {
      quizServiceMock.isUserAnswerCorrect.and.returnValue(false);

      expect(componentInstance.setState(0)).toBe('incorrect');
    });
  });

  it('The method "markCurrent" should return the string "current" if the current question index matches the displayed question index', () => {
    componentInstance.questionIndex = 0;

    expect(componentInstance.markCurrent(0)).toBe('current');
  });

  it('The method "markCurrent" should return the empty string if the current question index does not match the displayed question index', () => {
    componentInstance.questionIndex = 0;

    expect(componentInstance.markCurrent(1)).toBe('');
  });
});
