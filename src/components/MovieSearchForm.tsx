import React from 'react';
import { connect } from 'react-redux';
import useForm from 'react-hook-form';
import { createUseStyles } from 'react-jss';
import { TextField, IconButton, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { searchMovies } from '../actions/movies';

type FormData = {
  movieSearch: string;
};

type DispatchProps = {
  searchMovies: typeof searchMovies;
};

type P = DispatchProps;

const useStyles = createUseStyles({
  form: {
    margin: '30px auto',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    flex: 1
  },
  iconButton: {
    padding: 10
  }
});

const connectDecorator = connect<{}, DispatchProps, {}>(null, { searchMovies });

const MovieSearchForm = (props: P) => {
  const classes = useStyles();
  const { handleSubmit, register } = useForm<FormData>();
  const onSubmit = (formValues: FormData) => {
    props.searchMovies({ search: formValues.movieSearch });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={classes.form}
    >
      <TextField
        variant="outlined"
        className={classes.input}
        placeholder="Search"
        inputProps={{
          ref: register,
          name: 'movieSearch'
        }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

const decoratedComponent = connectDecorator(MovieSearchForm);
export { decoratedComponent as MovieSearchForm };
