import React from 'react';
import useForm from 'react-hook-form';
import { withRouter, RouteComponentProps } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { updateQuery } from '../common/util';

type FormData = {
  movieSearch: string;
};
type P = RouteComponentProps;

const useStyles = makeStyles({
  form: {
    margin: '30px auto',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    flex: 1
  },
  iconButton: {
    padding: 10
  }
});

const MovieSearchForm = (props: P) => {
  const classes = useStyles({});
  const { handleSubmit, register } = useForm<FormData>();
  const onSubmit = (formValues: FormData) => {
    props.history.push({
      pathname: props.location.pathname,
      search: updateQuery('', { search: formValues.movieSearch })
    });
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

const decoratedComponent = withRouter(MovieSearchForm);
export { decoratedComponent as MovieSearchForm };
