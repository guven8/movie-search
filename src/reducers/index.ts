import { combineReducers } from 'redux';
import { isType } from 'redux-typescript-actions';
import { searchMoviesAsync } from '../actions/movies';
import { MoviesState, moviesReducer } from './movies';

export type AppState = {
  movies: MoviesState;
};

export const rootReducer = combineReducers<AppState>({
  movies: moviesReducer
});
