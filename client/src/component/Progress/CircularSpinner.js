import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    marginTop : theme.spacing.unit * 25,
    marginLeft : theme.spacing.unit * 80
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