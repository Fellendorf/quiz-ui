import { Component, Input } from '@angular/core';

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
