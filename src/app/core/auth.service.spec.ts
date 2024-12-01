import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';
import { getSpyObject } from '../../test/getSpyObject';

describe('AuthService', () => {
  let service: AuthService;

  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  const QUIZ_ADMIN_PASSWORD_LOCAL_STORAGE_KEY = 'quiz-admin-password';

  const configureTestingModule = () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: ApiService,
          useValue: apiServiceSpy,
        },
        {
          provide: LocalStorageService,
          useValue: localStorageServiceSpy,
        },
      ],
    });
  };

  beforeEach(() => {
    apiServiceSpy = getSpyObject(ApiService);
    localStorageServiceSpy = getSpyObject(LocalStorageService);
    configureTestingModule();
    service = TestBed.inject(AuthService);
  });

  it('If a password is not stored in the local storage, then admin will not be authenticated during app initialization', () => {
    localStorageServiceSpy.getData
      .withArgs(QUIZ_ADMIN_PASSWORD_LOCAL_STORAGE_KEY)
      .and.returnValue(null);

    const authenticateAdminSpy = spyOn(
      AuthService.prototype,
      'authenticateAdmin',
    );
    // Testing module should be re-configured due to mock data is invoked in the service constructor
    // TODO: Create a quiz question based on the case
    // https://www.saninnsalas.com/spyon-service-method-called-in-the-constructor/
    configureTestingModule();
    service = TestBed.inject(AuthService);

    expect(authenticateAdminSpy).not.toHaveBeenCalled();
  });

  it('If a password is stored in the local storage, then admin will be authenticated during app initialization', () => {
    const password = 'password';

    localStorageServiceSpy.getData
      .withArgs(QUIZ_ADMIN_PASSWORD_LOCAL_STORAGE_KEY)
      .and.returnValue(password);
    const authenticateAdminSpy = spyOn(
      AuthService.prototype,
      'authenticateAdmin',
    );
    // Testing module should be re-configured due to mock data is invoked in the service constructor
    configureTestingModule();
    service = TestBed.inject(AuthService);

    expect(authenticateAdminSpy).toHaveBeenCalled();
  });

  it('If password is valid, then it "isAdmin" service property should be set to true and stored in the local storage', () => {
    const password = 'password';

    apiServiceSpy.checkPassword.and.returnValue(of({ isAdmin: true }));
    service.authenticateAdmin(password);

    expect(service.isAdmin()).toBe(true);
    expect(localStorageServiceSpy.setData).toHaveBeenCalledWith(
      QUIZ_ADMIN_PASSWORD_LOCAL_STORAGE_KEY,
      password,
    );
  });

  it('If password is invalid, then it "isAdmin" service property should be set to false and alert should be displayed', () => {
    apiServiceSpy.checkPassword.and.returnValue(of({ isAdmin: false }));
    const windowAlertSpy = spyOn(window, 'alert');
    service.authenticateAdmin('invalidPassword');

    expect(service.isAdmin()).toBe(false);
    expect(windowAlertSpy).toHaveBeenCalledWith('Password is invalid');
  });

  it('The method "unauthenticateAdmin()" should set "isAdmin" to false and remove password from local storage', () => {
    service.isAdmin.set(true);
    service.unauthenticateAdmin();

    expect(service.isAdmin()).toBe(false);
    expect(localStorageServiceSpy.removeData).toHaveBeenCalledWith(
      QUIZ_ADMIN_PASSWORD_LOCAL_STORAGE_KEY,
    );
  });
});
