import { Artist } from 'MyModels';
import { createAsyncAction } from 'typesafe-actions';

export const updateQueryAsync = createAsyncAction(
  'UPDATE_QUERY_REQUEST',
  'UPDATE_QUERY_SUCCESS',
  'UPDATE_QUERY_FAILURE'
)<string, string, string>();

export const searchArtistsAsync = createAsyncAction(
  'SEARCH_ARTISTS_REQUEST',
  'SEARCH_ARTISTS_SUCCESS',
  'SEARCH_ARTISTS_FAILURE'
)<string, Artist[], Error>();
