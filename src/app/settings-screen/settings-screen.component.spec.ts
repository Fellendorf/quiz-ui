import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';

import { SettingsScreenComponent } from './settings-screen.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: '',
})
export class HeaderStubComponent {}

describe('SettingsScreenComponent', () => {
  let componentInstance: SettingsScreenComponent;
  let fixture: ComponentFixture<SettingsScreenComponent>;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsScreenComponent, HeaderStubComponent],
      providers: [provideHttpClient(), provideRouter([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsScreenComponent);
    componentInstance = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('If a user change (check/unchek) input, then "toggleIsAdmin()" method should be invoked', () => {
    const componentToggleIsAdminSpy = spyOn(componentInstance, 'toggleIsAdmin');
    template.querySelector('input')?.click();

    expect(componentToggleIsAdminSpy).toHaveBeenCalled();
  });

  it('If the "toggleIsAdmin()" method is invoked and "isAdmin" is "true", then "unauthenticateAdmin()" method should be called', () => {
    const authService = TestBed.inject(AuthService);
    const unauthenticateAdminSpy = spyOn(authService, 'unauthenticateAdmin');

    componentInstance.isAdmin = signal(true);
    componentInstance.toggleIsAdmin();

    expect(unauthenticateAdminSpy).toHaveBeenCalled();
  });

  describe('If the "toggleIsAdmin()" method is invoked and "isAdmin" is "false"', () => {
    beforeEach(() => {
      componentInstance.isAdmin = signal(false);
    });

    it('Then "window.prompt()" method should be called', () => {
      const promptSpy = spyOn(window, 'prompt');
      componentInstance.toggleIsAdmin();

      expect(promptSpy).toHaveBeenCalled();
    });

    it('If a user provided a password in the prompt, then "authService.authenticateAdmin()" method should be called', () => {
      const authService = TestBed.inject(AuthService);
      const authenticateAdminSpy = spyOn(authService, 'authenticateAdmin');

      spyOn(window, 'prompt').and.returnValue('some password');
      componentInstance.toggleIsAdmin();

      expect(authenticateAdminSpy).toHaveBeenCalled();
    });
  });
});
