import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { AppState } from '../reducers';
import { getMovieById } from '../actions/movies';
import { MoviesState } from '../reducers/movies';

type StateProps = {
  moviesById: MoviesState['byId'];
};
type DispatchProps = {
  getMovieById: typeof getMovieById;
};
type P = StateProps & DispatchProps & RouteComponentProps;

const connectDecorator = connect(
  (state: AppState) => ({
    moviesById: state.movies.byId
  }),
  { getMovieById }
);

const MoviePage = (props: P) => {
  const movieId = props.location.search.replace('?id=', '');
  useEffect(() => {
    props.getMovieById(movieId);
  }, []);
  const movie = props.moviesById[movieId];

  if (!movie) return <CircularProgress />;

  return (
    <div>
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <p>{movie.Plot}</p>
    </div>
  );
};

const decoratedComponent = connectDecorator(MoviePage as any);
export { decoratedComponent as MoviePage };
