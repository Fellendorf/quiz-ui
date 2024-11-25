import { Component, Input } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  template: '',
})
export class HeaderStubComponent {}

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

export const activatedRouteMock = jasmine.createSpyObj('activatedRoute', [], {
  params: of([]),
});
export const apiServiceMock = jasmine.createSpyObj('apiService', [
  'getQuestions',
]);
export const routerMock = jasmine.createSpyObj('router', ['navigate']);
