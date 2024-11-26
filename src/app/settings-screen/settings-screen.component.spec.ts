import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { SettingsScreenComponent } from './settings-screen.component';
import { HeaderComponent } from '../shared/header/header.component';
import { AuthService } from '../core/auth.service';
import { authServiceMock, HeaderStubComponent } from '../../test/mocks';

describe('SettingsScreenComponent', () => {
  let componentInstance: SettingsScreenComponent;
  let fixture: ComponentFixture<SettingsScreenComponent>;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsScreenComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    })
      .overrideComponent(SettingsScreenComponent, {
        remove: {
          imports: [HeaderComponent],
        },
        add: {
          imports: [HeaderStubComponent],
        },
      })
      .compileComponents();

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
    componentInstance.isAdmin = signal(true);
    componentInstance.toggleIsAdmin();

    expect(authServiceMock.unauthenticateAdmin).toHaveBeenCalled();
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
      const password = 'some-password';
      spyOn(window, 'prompt').and.returnValue(password);
      componentInstance.toggleIsAdmin();

      expect(authServiceMock.authenticateAdmin).toHaveBeenCalledWith(password);
    });
  });
});
