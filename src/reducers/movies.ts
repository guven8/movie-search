import { Action as ReduxAction } from 'redux';
import { isType } from 'redux-typescript-actions';
import { MovieSearchResult, Movie } from '../services/movies';
import { searchMoviesAsync, getMovieByIdAsync } from '../actions/movies';
import { combineReducers } from 'redux';

export type MovieSearchResultsState = {
  [searchQuery: string]: {
    results: MovieSearchResult[];
    totalResults: string | null;
  }
};

const movieSearchResultsInitialState = {};

function movieSearchResultsReducer(
  state: MovieSearchResultsState = movieSearchResultsInitialState,
  action: ReduxAction
) {
  if (isType(action, searchMoviesAsync.done)) {
    state = {
      ...state,
      [action.payload.params.search]: {
        results: (state[action.payload.params.search]?.results || []).concat(action.payload.result.Search),
        totalResults: action.payload.result.totalResults
      }
    };
  }
  if (
    isType(action, searchMoviesAsync.failed) &&
    action.payload.error &&
    action.payload.error.Error === 'Movie not found!'
  ) {
    state = {
      ...state,
      [action.payload.params.search]: {
        results: [],
        totalResults: null
      }
    };
  }

  return state;
}

type MoviesById = {
  [imbdID: string]: Movie;
};

function moviesByIdReducer(state: MoviesById = {}, action: ReduxAction) {
  if (isType(action, getMovieByIdAsync.done)) {
    state = {
      ...state,
      [action.payload.params]: action.payload.result
    };
  }

  return state;
}

export type MoviesState = {
  searchResults: MovieSearchResultsState;
  byId: MoviesById;
};

export const moviesReducer = combineReducers<MoviesState>({
  searchResults: movieSearchResultsReducer,
  byId: moviesByIdReducer
});
