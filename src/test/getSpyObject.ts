import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ApiService } from '../app/core/api.service';
import { AuthService } from '../app/core/auth.service';
import { QuizService } from '../app/core/quiz.service';
import { LocalStorageService } from '../app/core/local-storage.service';
import { EventService } from '../app/core/event.service';

export function getSpyObject<T>(
  targetClass: (abstract new () => T) | T,
): jasmine.SpyObj<T> {
  switch (targetClass) {
    case ActivatedRoute:
      return jasmine.createSpyObj('activatedRoute', [], {
        params: of([]),
      });
    case Router:
      return jasmine.createSpyObj('router', ['navigate']);
    case ChangeDetectorRef:
      return jasmine.createSpyObj('changeDetectorRef', ['markForCheck']);
    case ApiService:
      return jasmine.createSpyObj('apiService', [
        'getQuestions',
        'checkPassword',
      ]);
    case AuthService:
      return jasmine.createSpyObj('authService', [
        'isAdmin',
        'authenticateAdmin',
        'unauthenticateAdmin',
      ]);
    case QuizService:
      return jasmine.createSpyObj('quizService', [
        'questions',
        'userAnswers',
        'getUserAnswer',
        'getCorrectQuestionCount',
        'isUserAnswerCorrect',
      ]);
    case EventService:
      return jasmine.createSpyObj('eventService', ['emit', 'listen']);
    case LocalStorageService:
      return jasmine.createSpyObj('localStorageService', [
        'setData',
        'getData',
        'removeData',
        'clearAll',
      ]);
    default:
      return jasmine.createSpyObj('emptyObject', []);
  }
}
