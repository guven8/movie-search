import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PrimarySearchAppBar } from './components/PrimarySearchAppBar';
import { MovieSearchPage } from './components/MovieSearchPage';
import { MoviePage } from './components/MoviePage';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 64
  }
}));

export const App = () => {
  const classes = useStyles({});

  return (
    <>
      <PrimarySearchAppBar />
      <Container maxWidth="md" className={classes.container}>
        <Switch>
          <Route path="/details" component={MoviePage} />
          <Route path="/" component={MovieSearchPage} />
        </Switch>
      </Container>
    </>
  );
};
