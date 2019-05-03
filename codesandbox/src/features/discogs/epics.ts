import { Epic } from 'redux-observable';
import {
  filter,
  map,
  switchMap,
  catchError,
  takeUntil,
  debounceTime,
  tap,
} from 'rxjs/operators';
import {
  RootAction,
  RootState,
  Services,
  isActionOf,
} from 'typesafe-actions';
import {
  of,
} from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { searchArtistsAsync } from './actions';

const getArgs = (query: string) => ({
  url: `https://api.discogs.com/database/search?q=${query}`,
  method: 'GET',
  headers: {
    Authorization: 'Discogs token=RZZkINnywTUvdjQlBnWxxyVScrcrrbTIDYrUQWZT',
  },
});

export const searchArtistsEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$) =>
    action$.pipe(
      // if we get a request
      filter(isActionOf(searchArtistsAsync.request)),
      debounceTime(3000),
      // if not empty or null
      filter(action => !!action.payload),
      tap(action => console.info('passed debounce', action)),
      switchMap(action => ajax(getArgs(action.payload)).pipe(
        tap((res: AjaxResponse) =>
          console.info('response', res.response.results)),
        map((res: AjaxResponse) =>
          // if success, map the response to our artist type
          searchArtistsAsync.success(
            res.response.results.map((el: any) =>
              ({
                id: parseInt(el.id, 10),
                title: el.title,
              })
            )
          )
        ),
        // if an error, then emit a failure action
        catchError((err: Error) => of(searchArtistsAsync.failure(err))),
        takeUntil(action$.pipe(filter(
          isActionOf([
            searchArtistsAsync.success,
            searchArtistsAsync.failure,
          ])
        )))
      ))
    );
