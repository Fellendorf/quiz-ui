import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  private events: Map<string, Subject<any>> = new Map();

  public emit(eventName: string, data?: any) {
    if (this.events.has(eventName)) {
      this.events.get(eventName)?.next(data);
    }
  }

  public listen(eventName: string) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Subject());
    }
    return this.events.get(eventName)?.asObservable();
  }
}
