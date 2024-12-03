import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { QuizService } from './quiz.service';
import { LocalStorageService } from './local-storage.service';
import { getSpyObject } from '../../test/getSpyObject';
import { Question } from '../models';

describe('QuizService', () => {
  let service: QuizService;

  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

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
    {
      _id: 'id3',
      text: 'question 3 text',
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
  // The first answer is correct, the second answer is not correct, the third answer is not provided:
  const userAnswers = [[0, 1], [2], []];

  beforeEach(() => {
    localStorageServiceSpy = getSpyObject(LocalStorageService);

    TestBed.configureTestingModule({
      providers: [
        QuizService,
        {
          provide: LocalStorageService,
          useValue: localStorageServiceSpy,
        },
      ],
    });
    service = TestBed.inject(QuizService);
    service.questions = signal([...questions]);
    service.userAnswers = signal([...userAnswers]);
  });

  it('The method "getCorrectQuestionCount()" should return the number of correct answers', () => {
    expect(service.getCorrectQuestionCount()).toBe(1);
  });

  it('The method "getUserAnswer()" should return user answer', () => {
    const index = 0;

    expect(service.getUserAnswer(index)).toEqual(userAnswers[index]);
  });

  it('The method "setUserAnswer()" should set user answer', () => {
    const index = 3;
    const answer = [0, 1, 2];
    service.setUserAnswer(index, answer);

    expect(service.getUserAnswer(index)).toEqual(answer);
  });

  describe('The method "isUserAnswerCorrect()" should return', () => {
    it('True if answer is correct', () => {
      expect(service.isUserAnswerCorrect(0)).toBeTrue();
    });

    it('False if answer is not correct', () => {
      expect(service.isUserAnswerCorrect(1)).toBeFalse();
    });

    it('False if answer is not provided', () => {
      expect(service.isUserAnswerCorrect(2)).toBeFalse();
    });
  });

  describe('The method "isAnswerProvided()" should return', () => {
    it('True if answer is provided', () => {
      expect(service.isAnswerProvided(0)).toBeTrue();
      expect(service.isAnswerProvided(1)).toBeTrue();
    });

    it('False if answer is not provided', () => {
      expect(service.isAnswerProvided(2)).toBeFalse();
    });
  });

  it('The method "resetUserAnswers()" should reset user answers', () => {
    service.resetUserAnswers();
    expect(service.userAnswers()).toEqual([]);
  });

  it('If the "topic" signal was changed then this topic should be stored in the local storage', () => {
    const topicName = 'test-topic';
    service.topic.set(topicName);
    // TODO: add the question to the quiz:
    // https://medium.com/ngconf/how-do-i-test-signals-signal-computed-effect-6d97e0732f2c
    TestBed.flushEffects();

    expect(localStorageServiceSpy.setData).toHaveBeenCalledWith(
      service['QUIZ_PARAM_TOPIC_LOCAL_STORAGE_KEY'],
      topicName,
    );
  });

  it('If the "count" signal was changed then this count should be stored in the local storage', () => {
    const count = 666;
    service.count.set(666);
    TestBed.flushEffects();

    expect(localStorageServiceSpy.setData).toHaveBeenCalledWith(
      service['QUIZ_PARAM_COUNT_LOCAL_STORAGE_KEY'],
      count,
    );
  });
});
