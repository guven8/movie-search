import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PrimarySearchAppBar } from './components/PrimarySearchAppBar';
import { MovieSearchPage } from './components/MovieSearchPage';
import { MoviePage } from './components/MoviePage';
// import PrimarySearchAppBarTest from './components/PrimarySearchAppBar.test';

const useStyles = makeStyles((theme) => {
  return {
    app: {
      // backgroundColor: theme.palette.grey.A700
    },
    container: {
      paddingTop: 64
      // backgroundColor: theme.palette.grey.A400
    }
  };
});

export const App = () => {
  const classes = useStyles({});

  return (
    <div className={classes.app}>
      <PrimarySearchAppBar />
      {/* <PrimarySearchAppBarTest /> */}
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route path="/details" component={MoviePage} />
          <Route path="/" component={MovieSearchPage} />
        </Switch>
      </Container>
    </div>
  );
};
