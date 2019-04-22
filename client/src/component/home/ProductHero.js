import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import ProductHeroLayout from './ProductHeroLayout';


const backgroundImage =
  process.env.PUBLIC_URL + '/auction-bg2.jpeg';

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * 10,
    },
  },
  more: {
    marginTop: theme.spacing.unit * 2,
  },
});

function ProductHero(props) {
  const { classes,person } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Auctions beyond Actions
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Auctions are fun, get ready, set, run!
      </Typography>
      <>
      {!person.isAuthenticated ?
        <Link to='/user/register'>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
        >
          Register
        </Button>
        </Link>
        :
        <Link to='/user/dashboard'>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
        >
          Dashboard
        </Button>
        </Link>
      }
      </>


      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};
const MapStateToProps = (state)=>{
  return {
    person : state.users
  }
}
export default withStyles(styles)(
  connect(MapStateToProps)(ProductHero));
