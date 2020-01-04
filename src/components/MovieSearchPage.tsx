import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { MovieSearchResults } from './MovieSearchResults';
import { searchMovies } from '../actions/movies';
import { parseQuery } from '../common/util';
import { MovieAutoComplete } from './MovieSearchInput';

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
    const movieSearchDTO = parseQuery(props.location.search);
    if (movieSearchDTO.search) props.searchMovies(movieSearchDTO);
  }, [props.location.search]);

  return (
    <>
      {/* <MovieAutoComplete /> */}
      <MovieSearchResults />
    </>
  );
};

const decoratedComponent = connectDecorator(MovieSearchPage as any);
export { decoratedComponent as MovieSearchPage };
