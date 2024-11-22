import { DOCUMENT } from '@angular/common';
import { InjectionToken, inject } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: (): Window => inject(DOCUMENT).defaultView!,
});

export const NAVIGATOR = new InjectionToken<Navigator>(
  'Global window.navigator object',
  {
    factory: () => inject(WINDOW).navigator,
  },
);

export const SCREEN = new InjectionToken<Screen>(
  'Global window.screen. object',
  {
    factory: () => inject(WINDOW).screen,
  },
);
