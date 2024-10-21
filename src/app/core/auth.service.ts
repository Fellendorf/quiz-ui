import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAdmin: boolean = true;

  public get isAdmin(): boolean {
    return this._isAdmin;
  }

  public set isAdmin(value: boolean) {
    this._isAdmin = value;
  }
}
