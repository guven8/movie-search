import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { MovieAutoComplete } from './MovieSearchInput';

const useStyles = makeStyles((theme) => ({
  heading: {
    position: 'absolute',
    top: 16,
    [theme.breakpoints.down('xs')]: {
      position: 'static',
      width: '100%'
    },
  }
}));

export const PrimarySearchAppBar = () => {
  const classes = useStyles({});

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.heading} >
          Movie Db
        </Typography>
        <MovieAutoComplete />
      </Toolbar>
    </AppBar>
  );
}