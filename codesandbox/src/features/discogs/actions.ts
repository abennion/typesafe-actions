import { Artist } from 'MyModels';
import { createAsyncAction } from 'typesafe-actions';

export const searchArtistsAsync = createAsyncAction(
  'SEARCH_ARTISTS_REQUEST',
  'SEARCH_ARTISTS_SUCCESS',
  'SEARCH_ARTISTS_FAILURE'
)<string, Artist[], Error>();
