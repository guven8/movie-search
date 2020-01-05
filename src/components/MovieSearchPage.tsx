import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { MovieSearchResults } from './MovieSearchResults';
import { searchMovies } from '../actions/movies';
import { parseQuery } from '../common/util';
import { AppState } from '../reducers';
import { MovieSearchResultsState } from '../reducers/movies';

type StateProps = {
  movieSearchResults: MovieSearchResultsState;
}
type DispatchProps = {
  searchMovies: typeof searchMovies;
};
export type QueryParamProps = { search: string; page?: string };
type P = StateProps & DispatchProps & RouteComponentProps;

const connectDecorator = connect<StateProps, DispatchProps, RouteComponentProps>(
  (state: AppState) => ({ movieSearchResults: state.movies.searchResults }), 
  { searchMovies }
);

const MovieSearchPage = (props: P) => {
  useEffect(() => {
    const movieSearchDTO = parseQuery(props.location.search);
    if (movieSearchDTO.search) props.searchMovies(movieSearchDTO);
  }, [props.location.search]);
  const searchQuery = parseQuery(props.location.search).search;
  const searchResults = props.movieSearchResults[searchQuery]?.results;
  const hanldeScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    console.log(e, bottom);
  }

  return (
    <div>
      <MovieSearchResults searchResults={searchResults} searchQuery={searchQuery} />
    </div>
  );
};

const decoratedComponent = connectDecorator(MovieSearchPage as any);
export { decoratedComponent as MovieSearchPage };
