import { inject, Injectable, signal } from '@angular/core';

import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly QUIZ_ADMIN_PASSWORD_LOCAL_STORAGE_KEY =
    'quiz-admin-password';

  private readonly apiService = inject(ApiService);
  private readonly localStorageService = inject(LocalStorageService);

  public isAdmin = signal<boolean>(false);

  constructor() {
    const password = this.localStorageService.getData<string | null>(
      this.QUIZ_ADMIN_PASSWORD_LOCAL_STORAGE_KEY,
    );
    if (password) {
      this.authenticateAdmin(password);
    }
  }

  public authenticateAdmin(password: string): void {
    this.apiService.checkPassword(password).subscribe((response) => {
      if (response?.isAdmin) {
        this.isAdmin.set(response.isAdmin);
        this.localStorageService.setData(
          this.QUIZ_ADMIN_PASSWORD_LOCAL_STORAGE_KEY,
          password,
        );
      } else {
        this.isAdmin.set(false);
        alert('Password is invalid');
      }
    });
  }

  public unauthenticateAdmin() {
    this.isAdmin.set(false);
    this.localStorageService.removeData(
      this.QUIZ_ADMIN_PASSWORD_LOCAL_STORAGE_KEY,
    );
  }
}
