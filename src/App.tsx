import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppBar, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MovieSearchPage } from './components/MovieSearchPage';
import { MoviePage } from './components/MoviePage';

const useStyles = makeStyles({
  headerTitle: {
    flexGrow: 1,
    textAlign: 'center',
    padding: '15px 0'
  }
});

export const App = (props) => {
  const classes = useStyles({});

  return (
    <>
      <AppBar position="static">
        <Typography variant="h4" className={classes.headerTitle}>
          Movie Search
        </Typography>
      </AppBar>
      <Container maxWidth="lg">
        <Switch>
          <Route path="/details" component={MoviePage} />
          <Route path="/" component={MovieSearchPage} />
        </Switch>
      </Container>
    </>
  );
};
