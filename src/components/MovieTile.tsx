import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MovieSearchResult } from '../services/movies';

type P = {
  movie: MovieSearchResult;
};

const useStyles = makeStyles((theme) => ({
  container: {
    height: 360,
    textAlign: 'center',
    '& a': {
      textDecoration: 'none'
    }
  },
  poster: {
    height: 280,
    backgroundSize: 'contain',
    backgroundColor: theme.palette.text.primary
  }
}));

export const MovieTile = (props: P) => {
  const classes = useStyles({});
  const { movie } = props;

  return (
    <Card className={classes.container}>
      <Link to={`/details?id=${movie.imdbID}`}>
        <CardMedia
          className={classes.poster}
          image={movie.Poster}
          title={movie.Title}
          component="div"
        />
        <CardContent>
          <Typography variant="body1" color="textPrimary" noWrap>
            {movie.Title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {movie.Year}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};
