import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Input } from 'reactstrap'
import Select from 'react-select'
import axios from '../axios/config'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { isEmpty } from 'lodash'
import CircularSpinner from '../Progress/CircularSpinner'
import AlertDialog from '../product/alert'


const styles = theme => ({

    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9

        height: "40px",

        width: "100%"

    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',

    },
    searchBar: {
        marginTop: '20px'
    }
});


class CurrentProduct extends React.Component {
      constructor() {
        super()
        this.state = {
            products: [],
            sessions: [],
            currentProducts: [],
            isLoaded: false,
            time: ''
        }

    }

    currentBid = () => {
        const { currentDateTime } = this.state.time

        const currentDate = moment(currentDateTime, 'DD-MM-YYYY')
        const currentTime = moment(currentDateTime)

        const BiddingProducts = this.state.products.filter(product => {
            if (!isEmpty(product.session)) {
                return (moment(product.session.date, 'DD-MM-YYYY').isSame(currentDate)
                    &&
                    moment(currentTime).isBetween(product.session.startTime, product.session.endTime))
            }
        })

        //console.log(BiddingProducts)

        this.setState(() => ({ currentProducts: BiddingProducts }))
    }


    componentDidMount() {
        Promise.all(
            [
                axios.get('/products', { headers: { 'x-auth': localStorage.getItem('token') } }),
                axios.get('http://worldclockapi.com/api/json/utc/now')
            ])
            .then((response) => {
                //console.log(response)
                //console.log(response.data)
                this.setState(() => ({
                    products: response[0].data.filter(product => product.status === 'Approved'),
                    time: response[1].data,
                    isLoaded: true
                }), () => { this.currentBid() })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { classes } = this.props;
         const { currentProducts } = this.state

        return (

            <React.Fragment>

                <main>
                     {!this.state.isLoaded ? <CircularSpinner /> :
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                       {this.state.currentProducts.length === 0 ?

                       <AlertDialog status={true} title="Currently No Product is Available For Bidding" history={this.props.history} url={`/user/dashboard`} />

                        :
                        <Grid container spacing={40}>
                            {currentProducts.map(product => (
                                <Grid item key={product._id} sm={6} md={4} lg={3}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={product.imageUrl[0]} // eslint-disable-line max-len
                                            title={product.name}

                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {product.name}
                                            </Typography>
                                            <Typography>
                                                 Min Price : {product.minPrice}
                                            </Typography>
                                            <Typography>
                                                Date  : {moment(product.session.date).format('DD-MM-YYYY')}
                                            </Typography>
                                             <Typography>
                                               Start Time : {moment(product.session.startTime).format('h:mm a')}
                                            </Typography>
                                            <Typography>
                                               End Time : {moment(product.session.endTime).format('h:mm a')}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link to={`/biddingroom/${product.session._id}`} target="_blank">
                                                <Button size="small" color="primary" variant="contained">
                                                   Enter Bidding Room
                                            </Button>
                                            </Link>
                                            <Link to={`/productmt/${product._id}`}>
                                                <Button size="small" color="primary" variant="contained">
                                                   Details
                                            </Button>
                                            </Link>

                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    }
                    </div>
                }
                </main>
                {/* Footer */}

                {/* End footer */}
            </React.Fragment>
        );
    }
}
CurrentProduct.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrentProduct);
