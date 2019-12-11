import { Action as ReduxAction } from 'redux';
import { isType } from 'redux-typescript-actions';
import { MovieSearchResult, Movie } from '../services/movies';
import { searchMoviesAsync, getMovieByIdAsync } from '../actions/movies';
import { combineReducers } from 'redux';

export type MovieSearchResultsState = {
  results: MovieSearchResult[];
  totalResults: string | null;
  search: string | null;
  // page: number | null;
};

const movieSearchResultsInitialState = {
  results: [],
  totalResults: null,
  search: null,
  // page: null
};

function movieSearchResultsReducer(
  state: MovieSearchResultsState = movieSearchResultsInitialState,
  action: ReduxAction
) {
  if (isType(action, searchMoviesAsync.done)) {
    console.log(action.payload.result);
    state = {
      results: action.payload.result.Search,
      totalResults: action.payload.result.totalResults,
      search: action.payload.params.search
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
