import { Component, Input } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  template: '',
})
export class HeaderStubComponent {
  @Input()
  public topText!: string;

  @Input()
  public bottomText!: string;
}

@Component({
  selector: 'app-options',
  standalone: true,
  template: '',
})
export class OptionsStubComponent {
  @Input()
  public options!: any;
}

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  template: '',
})
export class LodaingScreenStubComponent {}

@Component({
  selector: 'app-code',
  standalone: true,
  template: '',
})
export class CodeStubComponent {}

export function provideActivatedRouteMock() {
  return jasmine.createSpyObj('activatedRoute', [], {
    params: of([]),
  });
}
export function provideRouterMock() {
  return jasmine.createSpyObj('router', ['navigate']);
}
export function provideApiServiceMock() {
  return jasmine.createSpyObj('apiService', ['getQuestions']);
}
export function provideAuthServiceMock() {
  return jasmine.createSpyObj('authService', [
    'isAdmin',
    'authenticateAdmin',
    'unauthenticateAdmin',
  ]);
}
export function provideQuizServiceMock() {
  return jasmine.createSpyObj('quizService', [
    'questions',
    'userAnswers',
    'getUserAnswer',
    'getCorrectQuestionCount',
    'isUserAnswerCorrect',
  ]);
}
