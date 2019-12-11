import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { range } from 'lodash';
import { AppState } from '../reducers';
import { MovieTile } from './MovieTile';
import { makeStyles } from '@material-ui/core/styles';
import { MovieSearchResultsState } from '../reducers/movies';
import { searchMovies } from '../actions/movies';

type StateProps = MovieSearchResultsState;

type DispatchProps = {
  searchMovies: typeof searchMovies;
};

type P = StateProps & DispatchProps;

const useStyles = makeStyles({
  pagination: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '40px 0'
  }
});

const connectDecorator = connect<StateProps, DispatchProps>(
  (state: AppState) => ({
    ...state.movies.searchResults
  }),
  { searchMovies }
);

const MovieSearchResults = (props: P) => {
  if (!props.results.length) return null;
  const classes = useStyles({});
  const totalResults = parseInt(props.totalResults);
  const goToPage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    props.searchMovies({ search: props.search, page: parseInt(e.currentTarget.text) });
  }
  
  return (
    <div>
      <Grid container spacing={4}>
        {props.results.map((movie) => (
          <Grid key={movie.imdbID} xs={3} item>
            <MovieTile movie={movie} />
          </Grid>
        ))}
      </Grid>
      {totalResults > 10 && (
        <ul className={classes.pagination}>
          {range(Math.ceil(totalResults / 10)).map((i: number) => (
            <li key={i}>
              <a onClick={goToPage}>
                {i + 1}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const decoratedComponent = connectDecorator(MovieSearchResults);
export { decoratedComponent as MovieSearchResults };
