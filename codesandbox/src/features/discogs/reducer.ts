import { Artist } from 'MyModels';
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import { searchArtistsAsync, updateQueryAsync } from './actions';

interface ArtistsStateType {
  loading: boolean;
  query: string;
  artists: Artist[];
  error: string;
}

const initialState: ArtistsStateType = {
  loading: false,
  query: '',
  artists: [],
  error: '',
};

export const artists = createReducer(initialState)
  .handleAction(
    updateQueryAsync.request,
    (state, action) =>
      Object.assign({}, state, { query: action.payload }))
  .handleAction(
    searchArtistsAsync.request,
    (state, action) =>
      Object.assign({}, state, { loading: true }))
  .handleAction(
    searchArtistsAsync.success,
    (state, action) =>
      Object.assign({}, state, {
        loading: false,
        artists: action.payload,
        error: '',
      }))
  .handleAction(
    searchArtistsAsync.failure,
    (state, action) =>
      Object.assign({}, state, {
        loading: false,
        artists: [],
        error: action.payload.message,
      }));

const artistsReducer = combineReducers({
  artists,
});

export default artistsReducer;

export type ArtistsState = ReturnType<typeof artistsReducer>;
