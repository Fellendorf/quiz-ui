import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';
import { getSpyObject } from '../../test/getSpyObject';
import { Question } from '../models';

describe('ApiService', () => {
  let service: ApiService;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const question: Question = {
    topic: 'test-topic',
    text: 'test-question',
    options: [{ text: 'Option 1', isCorrect: true }],
  };

  beforeEach(() => {
    httpClientSpy = getSpyObject(HttpClient);
    TestBed.configureTestingModule({
      providers: [ApiService, { provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(ApiService);
  });

  it('The method "getTopics()" should make http get request to "/topics" endpoint', () => {
    service.getTopics();

    expect(httpClientSpy.get).toHaveBeenCalledWith('/topics');
  });

  it('The method "getQuestions()" should make http get request to "/questions" endpoint with correct parameters', () => {
    const topic = 'test-topic';
    const count = 5;
    service.getQuestions(topic, count);

    expect(httpClientSpy.get).toHaveBeenCalledWith('/questions', {
      params: {
        'topics[]': topic,
        count,
      },
    });
  });

  it('The method "getQuestion()" should make http get request to "/question" endpoint with correct parameters', () => {
    const id = 'test-id';
    service.getQuestion(id);

    expect(httpClientSpy.get).toHaveBeenCalledWith('/question', {
      params: { id },
    });
  });

  it('The method "updateQuestion()" should make http put request to "/question" endpoint with correct body', () => {
    service.updateQuestion(question);

    expect(httpClientSpy.put).toHaveBeenCalledWith('/question', question);
  });

  it('The method "createQuestion()" should make http post request to "/question" endpoint with correct body', () => {
    service.createQuestion(question);

    expect(httpClientSpy.post).toHaveBeenCalledWith('/question', question);
  });

  it('The method "checkPassword()" should make http post request to "/password" endpoint with correct body', () => {
    const password = 'test-password';
    service.checkPassword(password);

    expect(httpClientSpy.post).toHaveBeenCalledWith('/password', { password });
  });
});
