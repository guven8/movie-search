import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Grid, CircularProgress } from '@material-ui/core';
import { range } from 'lodash';
import { AppState } from '../reducers';
import { MovieTile } from './MovieTile';
import { makeStyles } from '@material-ui/core/styles';
import { searchMovies } from '../actions/movies';
import { MovieSearchResult } from '../services/movies';
import { updateQuery } from '../common/util';

type StateProps = {
  results: MovieSearchResult[];
  totalResults: string | null;
};
type P = StateProps & RouteComponentProps;

const useStyles = makeStyles({
  pagination: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '40px 0'
  }
});

const connectDecorator = connect((state: AppState) => ({
  results: state.movies.searchResults.results,
  totalResults: state.movies.searchResults.totalResults
}));

const MovieSearchResults = (props: P) => {
  const classes = useStyles({});
  const totalResults = parseInt(props.totalResults);
  const goToPage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    props.history.push({
      pathname: props.location.pathname,
      search: updateQuery(props.location.search, {
        page: e.currentTarget.text
      })
    });
  };
  
  if (!props.results.length) return <CircularProgress />;

  return (
    <div>
      <Grid container spacing={4}>
        {props.results.map((movie, i) => (
          <Grid key={movie.imdbID + i} xs={3} item>
            <MovieTile movie={movie} />
          </Grid>
        ))}
      </Grid>
      {totalResults > 10 && (
        <ul className={classes.pagination}>
          {range(totalResults / 10).map((i: number) => (
            <li key={i}>
              <a onClick={goToPage}>{i + 1}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const decoratedComponent = connectDecorator(
  withRouter(MovieSearchResults) as any
);
export { decoratedComponent as MovieSearchResults };
