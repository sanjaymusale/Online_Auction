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
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import FormLabel from '@material-ui/core/FormLabel';


import 'react-image-lightbox/style.css'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: "5%"
    },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        maxWidth: 750,
    },
    formlabelApproved: {
        fontSize: '15px',
        color: "Green",
        fontWeight: "bold"
    },
    formlabelPending: {
        fontSize: '15px',
        color: "Blue",
        fontWeight: "bold"
    },
    formlabelRejected: {
        fontSize: '15px',
        color: "Red",
        fontWeight: "bold"
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
    },
    label: {
        fontSize: '15px',
        color: "Black",
        fontWeight: "bold"
    }
});

class UserProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            isOpen: false,
            photoIndex: 0,
            product: {},
            session: {},
            category: {},
            status: '',
            time: '',
            isLoaded: false
        }
    }


    componentDidMount() {
        const id = this.props.match.params.id
        // console.log('id', id)
        axios.get(`/products/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                this.setState(() => ({
                    product: response.data,
                    status: response.data.status,
                    category: response.data.category,
                    session: response.data.session,
                    isLoaded: true

                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }


    handleDelete = () => {
        if (!isEmpty(this.state.session)) {
            axios.get('http://worldclockapi.com/api/json/utc/now')
                .then((response) => {
                    const currentDateTime = response.data.currentDateTime
                    //console.log('current', currentDateTime)
                    const { startTime, endTime, date } = this.state.session
                    const currentDate = moment(currentDateTime, 'DD-MM-YYYY')
                    const currentTime = moment(currentDateTime)
                    // console.log('currentDate', currentDate, 'currentTime', currentTime)

                    const biddingStartDate = moment(date, 'DD-MM-YYYY')
                    const biddingStartTime = moment(startTime)
                    const biddingEndTime = moment(endTime)
                    //console.log(biddingStartDate, biddingStartTime, biddingEndTime)

                    const datestatus = currentDate.isSame(biddingStartDate)
                    const timestatus = currentTime.isBetween(biddingStartTime, biddingEndTime)

                    if (datestatus && timestatus) {
                        alert('Product Cannot be Deleted as it is in Bidding Process')

                    } else {
                        const confirm = window.confirm('Are you Sure ??')

                        if (confirm) {
                            const id = this.props.match.params.id
                            axios.delete(`/products/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
                                .then((response) => {
                                    // console.log(response.data)
                                    this.props.history.push('/myproduct')
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            const confirm = window.confirm('Are you Sure ??')

            if (confirm) {
                const id = this.props.match.params.id
                axios.delete(`/products/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
                    .then((response) => {
                        // console.log(response.data)
                        this.props.history.push('/myproduct')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }

        }

    }
    handleApprove = () => {
        const id = this.props.match.params.id
        const data = {
            status: 'Approved'
        }
        axios.put(`/products/${id}`, data, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                //console.log(response.data)
                this.setState(() => ({ status: response.data.status }))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    handleReject = () => {
        const id = this.props.match.params.id
        const data = {
            status: 'Rejected'
        }
        axios.put(`/products/${id}`, data, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response.data)
                this.setState(() => ({ status: response.data.product.status }))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        const { classes } = this.props;
        const { isLoaded, product, photoIndex, isOpen,status } = this.state
        const { category, session } = this.state.product
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
                                        <Typography><FormLabel className={classes.label}>Category : {category.name}</FormLabel></Typography>
                                        <Typography gutterBottom>
                                            {status === "Approved" && <>
                                                <FormLabel className={classes.label}>Status :</FormLabel> <FormLabel className={classes.formlabelApproved}>{status}</FormLabel>
                                            </>}
                                            {status === "Pending" && <>
                                                <FormLabel className={classes.label}>Status :</FormLabel><FormLabel className={classes.formlabelPending}>{status}</FormLabel>
                                            </>}
                                            {status === "Rejected" && <>
                                                <FormLabel className={classes.label}>Status :</FormLabel> <FormLabel className={classes.formlabelRejected}>{status}</FormLabel>
                                            </>}

                                        </Typography>

                                        {!isEmpty(this.state.session) &&
                                            <>
                                                <Typography gutterBottom><FormLabel className={classes.label}>Date : {moment(session.date).format('DD-MM-YYYY')}</FormLabel> </Typography>
                                                <Typography gutterBottom><FormLabel className={classes.label}>Start Time : {moment(session.startTime).format('hh:mm A')}</FormLabel></Typography>
                                                <Typography gutterBottom><FormLabel className={classes.label}>End Time   : {moment(session.endTime).format('hh:mm A')}</FormLabel> </Typography>
                                            </>
                                        }
                                    </Grid>
                                    <Grid item>
                                        {(this.props.user.user.role !== 'admin' && product.seller._id === this.props.user.user.userId) ?
                                            <>
                                                <Link to="/myproduct">
                                                    <Button size="small" variant="contained" color="primary" className={classes.button}>
                                                        Back
                                    </Button>
                                                </Link>

                                                <Link to={`/product/edit/${product._id}`}>
                                                    <Button size="small" variant="contained" color="primary" className={classes.button}>
                                                        Edit
                                    </Button>
                                                </Link>
                                                <Button size="small" variant="contained" color="primary" className={classes.button} onClick={this.handleDelete}>
                                                    Delete
                                    </Button>
                                            </>
                                            :
                                            <>
                                                <Link to="/product/list">
                                                    <Button size="small" variant="contained" color="primary" className={classes.button}>
                                                        Back
                                    </Button>
                                                </Link>
                                            </>
                                        }
                                        {
                                            (this.state.status === 'Approved' && this.props.user.user.role === 'user' && isEmpty(this.state.session)) &&
                                            <Link to={`/session/addForm/${product._id}`}>
                                                <Button size="small" variant="contained" color="primary" className={classes.button}>
                                                    Add Time Slot
                                    </Button>
                                            </Link>
                                        }
                                        {this.props.user.user.role === 'admin' &&
                                            <>
                                                <Button onClick={this.handleApprove} size="small" variant="contained" color="primary" className={classes.button} disabled={this.state.status === "Approved" ? true : false}>Approve</Button>
                                                <Button onClick={this.handleReject} size="small" variant="contained" color="primary" className={classes.button} disabled={this.state.status === "Rejected" ? true : false}>Reject</Button>
                                            </>
                                        }
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
        )
    }



}

UserProduct.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

export default withStyles(styles)(
    connect(mapStateToProps)(UserProduct))
