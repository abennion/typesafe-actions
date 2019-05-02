// import { createSelector } from 'reselect';

import { ArtistsState } from './reducer';

export const isLoading = (state: ArtistsState) => state.artists.loading;
export const getQuery = (state: ArtistsState) => state.artists.query;
export const getArtists = (state: ArtistsState) => state.artists.artists;
