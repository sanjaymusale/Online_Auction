import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing.unit * 2,
      marginTop : theme.spacing.unit * 25,
      marginLeft : theme.spacing.unit * 80
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing.unit * 2,
      marginTop : theme.spacing.unit * 15,
      marginLeft : theme.spacing.unit * 40
    },
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing.unit * 2,
      marginTop : theme.spacing.unit * 15,
      marginLeft : theme.spacing.unit * 60
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing.unit * 2,
      marginTop : theme.spacing.unit * 10,
      marginLeft : theme.spacing.unit * 15
    },

  },
});

function CircularSpinner(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
}

CircularSpinner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularSpinner);
