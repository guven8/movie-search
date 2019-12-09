import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { AppState } from '../reducers';
import { MovieTile } from './MovieTile';
import { Movie } from '../services/movies';

type StateProps = {
  searchResults: Movie[];
};

type P = StateProps;

const connectDecorator = connect<StateProps>((state: AppState) => ({
  searchResults: state.movies.searchResults
}));

const MovieSearchResults = (props: P) => {
  if (!props.searchResults) return null;

  return (
    <Grid container spacing={4}>
      {props.searchResults.map((movie) => (
        <Grid key={movie.imdbID} xs={3} item>
          <MovieTile movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

const decoratedComponent = connectDecorator(MovieSearchResults);
export { decoratedComponent as MovieSearchResults };
