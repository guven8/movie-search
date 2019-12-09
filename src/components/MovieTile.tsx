import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
// import { createUseStyles } from 'react-jss';
import { makeStyles } from '@material-ui/core/styles';
import { MovieSearchResult } from '../services/movies';

type P = {
  movie: MovieSearchResult;
};

const useStyles = makeStyles({
  container: {
    height: 435,
    textAlign: 'center',
    '& a': {
      textDecoration: 'none'
    }
  },
  poster: {
    height: 350
  }
});

export const MovieTile = (props: P) => {
  const classes = useStyles();
  const { movie } = props;

  return (
    <Card className={classes.container}>
      <Link to={`/details?id=${movie.imdbID}`}>
        <CardMedia
          className={classes.poster}
          image={movie.Poster}
          title={movie.Title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.Title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {movie.Year}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};
