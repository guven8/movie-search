import qs from 'querystring';
import { QueryParamProps } from '../components/MovieSearchPage';
import { MovieSearchDTO } from '../services/movies';

export const updateQuery = (
  oldQuery: string,
  newQuery: { [name: string]: string }
) =>
  qs.stringify({
    ...qs.parse(oldQuery.replace('?', '')),
    ...newQuery
  });

export const parseQuery = (
  queryParams: string
): MovieSearchDTO => {
  const query = qs.parse(queryParams.replace('?', '')) as QueryParamProps;

  return {
    search: query.search,
    page: query.page ? parseInt(query.page) : null
  };
};
