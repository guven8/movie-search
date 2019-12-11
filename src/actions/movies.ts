import actionCreatorFactory from 'redux-typescript-actions';
import {
  MovieSearchDTO,
  MovieService,
  MovieSearchResults,
  Movie
} from '../services/movies';

const actionCreator = actionCreatorFactory();

export const searchMoviesAsync = actionCreator.async<
  MovieSearchDTO,
  MovieSearchResults
>('GET_MOVIE_BY_SEARCH');
export function searchMovies(dto: MovieSearchDTO) {
  return async (dispatch) => {
    dispatch(searchMoviesAsync.started(dto));
    const movieService = new MovieService();

    try {
      var result = await movieService.searchMovies(dto);
    } catch (e) {
      dispatch(searchMoviesAsync.failed({ params: dto, error: e }));
      throw e;
    }

    if (result.data.Response === 'True') {
      return dispatch(
        searchMoviesAsync.done({ params: dto, result: result.data })
      );
    }
    dispatch(searchMoviesAsync.failed({ params: dto, error: result.data }));
    return Promise.reject(result);
  };
}

export const getMovieByIdAsync = actionCreator.async<string, Movie>(
  'GET_MOVIE_BY_ID'
);
export function getMovieById(imdbID: string) {
  return async (dispatch) => {
    dispatch(getMovieByIdAsync.started(imdbID));
    const movieService = new MovieService();

    try {
      var result = await movieService.getMovieById(imdbID);
    } catch (e) {
      dispatch(getMovieByIdAsync.failed({ params: imdbID, error: e }));
      throw e;
    }

    if (result.data.Response === 'True') {
      return dispatch(
        getMovieByIdAsync.done({ params: imdbID, result: result.data })
      );
    }
    dispatch(getMovieByIdAsync.failed({ params: imdbID, error: result.data }));
    return Promise.reject(result);
  };
}
