import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

interface Loading {
  type: 'loading';
}

interface Loaded<T> {
  type: 'loaded';
  data: T;
}

interface Errored {
  type: 'error';
  error: Error;
}

type LoadingState<T = unknown> = Loading | Loaded<T> | Errored;

export function toLoadingStateStream<T>(
  source$: Observable<T>
): Observable<LoadingState<T>> {
  return source$.pipe(
    map((data: T) => ({ type: 'loaded', data } as Loaded<T>)),
    catchError((error: Error) => of({ type: 'error', error } as Errored)),
    startWith({ type: 'loading' } as Loading)
  );
}
