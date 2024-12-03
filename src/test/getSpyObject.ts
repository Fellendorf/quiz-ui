import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ApiService } from '../app/core/api.service';
import { AuthService } from '../app/core/auth.service';
import { QuizService } from '../app/core/quiz.service';
import { LocalStorageService } from '../app/core/local-storage.service';
import { EventService } from '../app/core/event.service';
import { HttpClient } from '@angular/common/http';

type TargetClass<T> = (abstract new (...args: any[]) => T) | T;
type SpyObjBaseName = string;

function getSpyObjectParams<T>(
  targetClass: TargetClass<T>,
): [SpyObjBaseName, jasmine.SpyObjMethodNames, jasmine.SpyObjPropertyNames?] {
  switch (targetClass) {
    case ActivatedRoute:
      return [
        'activatedRoute',
        [],
        {
          params: of([]),
        },
      ];
    case Router:
      return ['router', ['navigate']];
    case ChangeDetectorRef:
      return ['changeDetectorRef', ['markForCheck']];
    case HttpClient:
      return ['httpClient', ['get', 'put', 'post']];
    case ApiService:
      return ['apiService', ['getQuestions', 'checkPassword']];
    case AuthService:
      return [
        'authService',
        ['isAdmin', 'authenticateAdmin', 'unauthenticateAdmin'],
      ];
    case QuizService:
      return [
        'quizService',
        [
          'questions',
          'userAnswers',
          'getUserAnswer',
          'getCorrectQuestionCount',
          'isUserAnswerCorrect',
        ],
      ];
    case EventService:
      return ['eventService', ['emit', 'listen']];
    case LocalStorageService:
      return [
        'localStorageService',
        ['setData', 'getData', 'removeData', 'clearAll'],
      ];
    case Storage:
      return ['storage', ['setItem', 'getItem', 'removeItem', 'clear']];
    default:
      return ['emptyObject', []];
  }
}

export function getSpyObject<T>(
  targetClass: TargetClass<T>,
): jasmine.SpyObj<T> {
  return jasmine.createSpyObj(...getSpyObjectParams(targetClass));
}
