import { Action as ReduxAction } from 'redux';
import { isType } from 'redux-typescript-actions';
import { keyBy } from 'lodash';
import { MovieSearchResult, Movie } from '../services/movies';
import { searchMoviesAsync, getMovieByIdAsync } from '../actions/movies';
import { combineReducers } from 'redux';

function movieSearchResultsReducer(state: MovieSearchResult[] = [], action: ReduxAction) {
  if (isType(action, searchMoviesAsync.done)) {
    state = action.payload.result.Search
  }

  return state;
}

type MoviesById = {
  [imbdID: string]: Movie;
}

function moviesByIdReducer(state: MoviesById = {}, action: ReduxAction) {
  if (isType(action, getMovieByIdAsync.done)) {
    console.log(action.payload);
    state = {
      ...state,
      [action.payload.params]: action.payload.result
    }
  }

  return state;
}

export type MoviesState = {
  searchResults: MovieSearchResult[];
  byId: MoviesById
};

export const moviesReducer = combineReducers<MoviesState>({
  searchResults: movieSearchResultsReducer,
  byId: moviesByIdReducer
});
