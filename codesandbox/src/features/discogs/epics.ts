import { Epic } from 'redux-observable';
// import { timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { RootAction, RootState, Services, isActionOf } from 'typesafe-actions';
// import { ajax } from 'rxjs/ajax';
import { searchArtistsAsync } from './actions';
// import { getArtists } from './selectors';

// const getUrl = (query: string) => `https://example.com?q=${query}`;

// const searchUsers = action$ =>
//   action$.pipe(
//     ofType(SEARCHED_USERS),
//     map(action => action.payload.query),
//     filter(q => !!q),
//     switchMap(q =>
//       // debounce
//       timer(800).pipe(
//         takeUntil(action$.pipe(ofType(CLEARED_SEARCH_RESULTS))),
//         mergeMap(() =>
//           merge(
//             of(replace(`?q=${q}`)),
//             ajax.getJSON(`https://api.github.com/search/users?q=${q}`).pipe(
//               map(res => res.items),
//               map(receiveUsers)
//             )
//           )
//         )
//       )
//     )
//   )

export const searchArtistsEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$) =>
  action$.pipe(
    filter(isActionOf(searchArtistsAsync.request)),
    switchMap(_ =>
      map(searchArtistsAsync.success)
      )
  );

// switchMap(() =>
//   from(api.todos.loadSnapshot()).pipe(
//     map(loadTodosAsync.success),
//     catchError((message: string) => of(loadTodosAsync.failure(message)))
//   )
// )
// switchMap(q =>
//   // debounce
//   timer(800).pipe(
//     // what if it's not a success, takeUntil not?
//     takeUntil(action$.pipe(isActionOf(searchArtistsAsync.success))),
//     mergeMap(() =>
//       ajax.getJSON(`https://api.github.com/search/users?q=${q}`).pipe(
//         map(res => res.items),
//         map(receiveUsers)
//       )
//     )
//   )
// )
// switchMap(() =>
//   // from(api.todos.loadSnapshot()).pipe(
//   //   map(searchArtistsAsync.success),
//   //   catchError((message: string) => of(searchArtistsAsync.failure(message)))
//   // )
//   ajax(getUrl('nirva')).pipe(

//   )
// )
