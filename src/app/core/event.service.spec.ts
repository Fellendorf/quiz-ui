import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;

  const eventName = 'test-event';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventService],
    });
    service = TestBed.inject(EventService);
  });

  it('The method "listen()" should store a new Subject() in the "events" collection if it is not stored there', () => {
    const eventsSetSpy = spyOn(service['events'], 'set');
    service.listen(eventName);

    expect(eventsSetSpy).toHaveBeenCalledWith(eventName, new Subject());
  });

  it('The method "listen()" should not store a new Subject() in the "events" collection if it is already stored there', () => {
    service.listen(eventName);
    const eventsSetSpy = spyOn(service['events'], 'set');
    service.listen(eventName);

    expect(eventsSetSpy).not.toHaveBeenCalled();
  });

  it('The method "listen()" should return stored in the "events" collection Subject as Observable', () => {
    expect(service.listen(eventName)).toEqual(new Subject().asObservable());
  });

  it('The method "emit()" should do nothing if event is not in the "events" collection', () => {
    const eventName = 'test-event';

    expect(service.emit(eventName)).toBeUndefined();
  });

  it('The method "emit()" should emit data to subscribers', () => {
    const testData = 'test-data';
    service.listen(eventName)?.subscribe((data) => {
      expect(data).toEqual(testData);
    });
    service.emit(eventName, testData);
  });
});
