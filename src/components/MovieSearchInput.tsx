import React from 'react';
import { debounce } from 'lodash';
import { withRouter, RouteComponentProps } from 'react-router';
import { Autocomplete } from '@material-ui/lab';
import classNames from 'classnames';
import {
  IconButton,
  CircularProgress,
  TextField,
  Paper,
  Avatar,
  Typography
} from '@material-ui/core';
import { makeStyles, fade, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { MovieSearchResult, MovieService } from '../services/movies';
import { updateQuery } from '../common/util';

type P = RouteComponentProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    [theme.breakpoints.down('xs')]: {
      // width: '100%'
    },
    // margin: '0 auto',
    minWidth: 180,
    padding: 2,
    paddingLeft: 56,
    position: 'relative'
  },
  searchInput: {
    '& input': {
      transition: 'width 300ms',
      color: 'white',
      '&:focus': {
        width: 165
      }
    }
  },
  searchInputDirty: {
    width: 165
  },
  loadingSpinner: {
    position: 'absolute',
    right: 0
  },
  searchIcon: {
    position: 'absolute',
    top: 0,
    left: 16,
    color: 'white',
    height: '100%'
  },
  group: {
    position: 'absolute',
    width: 341,
    left: -56,
    top: 1
  },
  searchResult: {
    display: 'flex',
    alignItems: 'center',

    '& .search-result-poster': {
      marginRight: 10
    }
  }
}));

function MovieSearchInput(props: P) {
  const classes = useStyles({});
  const [options, setOptions] = React.useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const movieService = new MovieService();

  React.useEffect(() => {
    const findMovieResults = debounce(() => {
      if (!search) return;
      setLoading(true);
      (async () => {
        const result = await movieService.searchMovies({ search });
        // console.log(result);
        if (result && result.data && result.data.Response === 'True') {
          setOptions(result.data.Search);
        }
        setLoading(false);
      })();
    }, 1000);
    findMovieResults();
  }, [search]);

  const onInputChange = (event: any) => {
    if (event.target.value) setSearch(event.target.value);
  };

  const getOptionLabel = (option: string | MovieSearchResult) => {
    if (!option) return null;
    return typeof option === 'string' ? option : option.Title;
  };

  const onChange = (_e, value: MovieSearchResult | string) => {
    props.history.push({
      pathname: props.location.pathname,
      search: updateQuery('', { search: getOptionLabel(value) })
    });
  };

  const movieAutoComplete = 'movie-autocomplete';

  return (
    <div className={classes.container}>
      <Autocomplete
        id={movieAutoComplete}
        className={classNames({
          [classes.searchInput]: true,
          [classes.searchInputDirty]: !!search
        })}
        onInputChange={onInputChange}
        onChange={onChange}
        getOptionLabel={getOptionLabel}
        options={options}
        loading={loading}
        freeSolo
        // debug
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label={null}
            placeholder="Search..."
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress
                      color="primary"
                      size={24}
                      className={classes.loadingSpinner}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
        renderOption={(params: MovieSearchResult) => {
          return (
            <div className={classes.searchResult}>
              <Avatar alt={params.Title} src={params.Poster} className="search-result-poster" />
              <Typography variant="subtitle1">
                {params.Title}
              </Typography>
            </div>
          );
        }}
        PaperComponent={(props) => (
          <Paper className={classes.group}>{props.children}</Paper>
        )}
      />
      <label htmlFor={movieAutoComplete}>
        <SearchIcon className={classes.searchIcon} />
      </label>
    </div>
  );
}

const decoratedComponent = withRouter(MovieSearchInput);
export { decoratedComponent as MovieAutoComplete };
