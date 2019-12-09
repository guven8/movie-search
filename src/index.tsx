import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { AppBar, Typography, CssBaseline, Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { MovieSearchForm } from './components/MovieSearchForm';
import { MovieSearchResults } from './components/MovieSearchResults';
import { MoviePage } from './components/MoviePage';
import store from './store';

const useStyles = createUseStyles({
  title: {
    flexGrow: 1,
    textAlign: 'center',
    padding: '15px 0'
  }
});

const App = () => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="static">
          <Typography variant="h4" className={classes.title}>
            Movie Search
          </Typography>
        </AppBar>
        <Container maxWidth="lg">
          <Switch>
            <Route path="/details" component={MoviePage} />
            <Route path="/">
              <MovieSearchForm />
              <MovieSearchResults />
            </Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
