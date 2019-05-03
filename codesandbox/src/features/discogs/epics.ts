import { Epic } from 'redux-observable';
// import { Artist } from 'MyModels';
// import { timer } from 'rxjs';
import {
  filter,
  map,
  switchMap,
  catchError,
  takeUntil,
  debounceTime,
} from 'rxjs/operators';
import { RootAction, RootState, Services, isActionOf } from 'typesafe-actions';
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

// curl "https://api.discogs.com/database/search?q=Madlib"
// -H "Authorization: Discogs token=RZZkINnywTUvdjQlBnWxxyVScrcrrbTIDYrUQWZT"
// {"pagination": {"per_page": 50, "items": 2029, "page": 1,
// "urls": {"last": "https://api.discogs.com/database/search?q=Madlib&per_page=50&page=41",
// "next": "https://api.discogs.com/database/search?q=Madlib&per_page=50&page=2"},
// "pages": 41},
// "results": [{"thumb": "https://img.discogs.com/ixlt5

export const searchArtistsEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$) =>
    action$.pipe(
      // tap(console.log),
      filter(isActionOf(searchArtistsAsync.request)),
      debounceTime(3000),
      filter(action => !!action.payload),
      // tap(action => console.log('action', action)),
      switchMap(action => ajax(getArgs(action.payload)).pipe(
        map((res: AjaxResponse) =>
          searchArtistsAsync.success(
            res.response.results.map((el: any) => ({ id: el.id, title: el.title }))
          )
        ),
        catchError((err: Error) => of(searchArtistsAsync.failure(err.message))),
        takeUntil(action$.pipe(filter(
          isActionOf([
            searchArtistsAsync.success,
            searchArtistsAsync.failure,
          ])
        )))
      ))
    );
