import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '../shared/customTokens';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly localStorage = inject(LOCAL_STORAGE);

  public setData<T>(key: string, data: T): void {
    this.localStorage.setItem(key, JSON.stringify(data));
  }

  public getData<T>(key: string): T | null {
    const data = this.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  public removeData(key: string): void {
    this.localStorage.removeItem(key);
  }

  public clearAll() {
    this.localStorage.clear();
  }
}
