import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';

import { ProgressBarComponent } from './progress-bar.component';
import { getSpyObject } from '../../../test/getSpyObject';
import { QuizService } from '../../core/quiz.service';
import { EventService } from '../../core/event.service';

describe('ProgressBarComponent', () => {
  let componentInstance: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  let cdrSpy: jasmine.SpyObj<ChangeDetectorRef>;
  let quizServiceSpy: jasmine.SpyObj<QuizService>;
  let eventServiceSpy: jasmine.SpyObj<EventService>;

  const questionChangedEvent = new Subject();

  beforeEach(async () => {
    cdrSpy = getSpyObject(ChangeDetectorRef);
    quizServiceSpy = getSpyObject(QuizService);
    eventServiceSpy = getSpyObject(EventService);

    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent],
      providers: [
        { provide: QuizService, useValue: quizServiceSpy },
        {
          provide: ChangeDetectorRef,
          useValue: cdrSpy,
        },
        { provide: EventService, useValue: eventServiceSpy },
      ],
    }).compileComponents();

    eventServiceSpy.listen.and.returnValue(questionChangedEvent.asObservable());
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
      quizServiceSpy.isUserAnswerCorrect.and.returnValue(true);

      expect(componentInstance.setState(0)).toBe('correct');
    });

    it('String "incorrect" if a user answer is not correct', () => {
      quizServiceSpy.isUserAnswerCorrect.and.returnValue(false);

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
