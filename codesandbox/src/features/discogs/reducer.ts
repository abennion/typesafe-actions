import { Artist } from 'MyModels';
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { searchArtistsAsync } from './actions';
// import { string } from 'prop-types';

interface  ArtistsStateType {
  loading: boolean;
  query: string;
  artists: Artist[];
}

const initialState: ArtistsStateType = {
  loading: false,
  query: '',
  artists: [
    {
      id: '1',
      title: 'rolling strongs',
    },
    {
      id: '2',
      title: 'thee nobodies',
    },
  ],
};

export const artists = createReducer(initialState)
  .handleAction(
    searchArtistsAsync.request,
    (state, action) =>
      Object.assign({}, state, {loading: true, query: action.payload}))
  .handleAction(
    searchArtistsAsync.success,
    (state, action) =>
      Object.assign({}, state, {loading: false, artists: action.payload}))
  .handleAction(
    searchArtistsAsync.failure,
    (state, action) =>
      Object.assign({}, state, {loading: false, artists: []}));

const artistsReducer = combineReducers({
  // isLoadingArtists,
  artists,
});

export default artistsReducer;
export type ArtistsState = ReturnType<typeof artistsReducer>;
