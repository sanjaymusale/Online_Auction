import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import axios from '../axios/config'
import moment from 'moment'
import Button from '@material-ui/core/Button';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import { Link } from 'react-router-dom'


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: "5%"
    },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        maxWidth: 800,
    },
    image: {
        width: 208,
        height: 208,
    },
    img: {
        margin: 'auto',
        display: 'block',

    },
    button: {
        margin: theme.spacing.unit,
    }
});

class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: '',
            isLoaded: false,
            isOpen: false,
            photoIndex: 0
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/products/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((res) => {
               // console.log(res.data)
                this.setState({ product: res.data, isLoaded: true })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        const { classes } = this.props;
        const { isLoaded, product, photoIndex, isOpen } = this.state
        const { session, seller } = this.state.product
        return (
            <div className={classes.root}>
                {isLoaded &&
                    <Paper className={classes.paper}>
                        <Grid container spacing={16}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="Click here" src={product.imageUrl[0]} onClick={() => this.setState({ isOpen: true })} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={16}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h5" color="primary">
                                            {product.name}
                                        </Typography>
                                        <hr />
                                        <Typography gutterBottom variant="subheading">{product.description}</Typography>
                                        <hr />
                                        <Typography gutterBottom>Seller : {seller.firstName + ' ' + seller.lastName}</Typography>
                                        <Typography gutterBottom>Date : {moment(session.date).format('DD-MM-YYYY')} </Typography>
                                        <Typography gutterBottom>Start Time : {moment(session.startTime).format('hh:mm A')}</Typography>
                                        <Typography gutterBottom>End Time   : {moment(session.endTime).format('hh:mm A')} </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/user/dashboard">
                                            <Button size="small" variant="contained" color="primary" className={classes.button}>
                                                Back
                                    </Button>
                                        </Link>
                                        <Button size="small" variant="contained" color="primary" className={classes.button} onClick={() => this.setState({ isOpen: true })}>
                                            More Images
                                    </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" color="secondary">Bid : &#8377; {product.minPrice}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                }
                {isOpen && (
                    <Lightbox
                        mainSrc={product.imageUrl[photoIndex]}
                        nextSrc={product.imageUrl[(photoIndex + 1) % product.imageUrl.length]}
                        prevSrc={product.imageUrl[(photoIndex + product.imageUrl.length - 1) % product.imageUrl.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + product.imageUrl.length - 1) % product.imageUrl.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % product.imageUrl.length
                            })
                        }
                    />
                )}
            </div>
        );
    }

}
ProductDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductDetail);