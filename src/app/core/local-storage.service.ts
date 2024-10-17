import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public setData<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getData<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  public removeData(key: string): void {
    localStorage.removeItem(key);
  }

  public clearAll() {
    localStorage.clear();
  }
}
