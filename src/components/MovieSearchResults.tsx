import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MovieTile } from './MovieTile';
import { MovieSearchResult } from '../services/movies';

type P = {
  searchResults: MovieSearchResult[];
  searchQuery: string;
};

const useStyles = makeStyles({
  pagination: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '40px 0'
  },
  noResults: {
    marginTop: 40
  }
});

const MovieSearchResults = (props: P) => {
  const classes = useStyles({});
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    console.log(e, bottom);
  }

  return (
    <div onScroll={handleScroll}>
      <Grid container spacing={4} justify="center" alignItems="center">
        {props.searchResults &&
          props.searchResults.map((movie, i) => (
            <Grid key={movie.imdbID + i} xs={12} sm={6} md={4} lg={3} item>
              <MovieTile movie={movie} />
            </Grid>
          ))}
      </Grid>
      {!props.searchResults && (
        <Typography color="secondary" variant="h2" className={classes.noResults}>
          No Results Found for "{props.searchQuery}" :(
        </Typography>
      )}
    </div>
  );
};

export { MovieSearchResults };
