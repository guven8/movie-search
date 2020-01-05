import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Container } from '@material-ui/core';
import { MovieAutoComplete } from './MovieSearchInput';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export const PrimarySearchAppBar = () => {
  const classes = useStyles({});

  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap>
            Movie Db
        </Typography>
          <MovieAutoComplete />
        </Toolbar>
      </Container>
    </AppBar>
  );
}