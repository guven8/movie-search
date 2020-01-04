import { RemoteService } from './remoteService';
import config from '../config';

type MovieRating = {
  Source: string;
  Value: string;
};

export type Movie = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type MovieSearchResult = Pick<
  Movie,
  'Title' | 'Year' | 'imdbID' | 'Type' | 'Poster'
>;

export type MovieSearchDTO = {
  search: string;
  type?: 'movie' | 'series' | 'episode';
  year?: number;
  page?: number;
};

export type MovieSearchResults = {
  Search: MovieSearchResult[];
  totalResults: string;
};

export type MovieSearchNoResults = {
  Response: 'False';
  Error: 'Movie not found!';
};

export class MovieService extends RemoteService {
  baseUri = config.baseUri;
  apiKey = config.apiKey;

  searchMovies(dto: MovieSearchDTO) {
    return this.callService<MovieSearchResults>('GET', '/', {
      s: dto.search,
      type: dto.type,
      y: dto.year,
      page: dto.page
    });
  }

  getMovieById(imdbID: string) {
    return this.callService<Movie>('GET', '/', {
      i: imdbID
    });
  }
}
