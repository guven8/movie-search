import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { MovieSearchForm } from './MovieSearchForm';
import { MovieSearchResults } from './MovieSearchResults';
import { searchMovies } from '../actions/movies';
import { getMovieSearchFromQueryParams } from '../common/util';

type DispatchProps = {
  searchMovies: typeof searchMovies;
};
export type QueryParamProps = { search: string; page?: string };
type P = DispatchProps & RouteComponentProps;

const connectDecorator = connect<{}, DispatchProps, RouteComponentProps>(null, {
  searchMovies
});

const MovieSearchPage = (props: P) => {
  useEffect(() => {
    props.searchMovies(getMovieSearchFromQueryParams(props.location.search));
  }, [props.location.search]);

  return (
    <>
      <MovieSearchForm />
      <MovieSearchResults />
    </>
  );
};

const decoratedComponent = connectDecorator(MovieSearchPage as any);
export { decoratedComponent as MovieSearchPage };
