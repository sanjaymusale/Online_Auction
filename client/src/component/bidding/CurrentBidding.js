import React from 'react'

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';

import axios from '../axios/config';
import FormLabel from '@material-ui/core/FormLabel';

import { connect } from 'react-redux'
import BidInput from './BidInput';
import EndTime from './EndTime';
import DisplayBid from './DisplayBid';
import { SERVER_URL } from '../config/config'

//const SocketURL = 'http://localhost:3001/'

const io = require('socket.io-client');
const socket = io(`${SERVER_URL}`);

const styles = theme => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,

        [theme.breakpoints.down(600 + theme.spacing.unit * 2 * 2)]: {
            width: "80%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.up(1200 + theme.spacing.unit * 2 * 2)]: {
            width: "80%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.up(300 + theme.spacing.unit * 2 * 2)]: {
            width: "80%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        background: "#ffcc66",
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {

            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 0.5,
        },
        [theme.breakpoints.up(1200 + theme.spacing.unit * 2 * 2)]: {

            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.down(300 + theme.spacing.unit * 2 * 2)]: {

            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    bottompaper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,

        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {

            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 0.5,
        },
    },

    titlepaper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    joinpaper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        minHeight: 200,
        color: theme.palette.text.secondary,
    },
    formLabel: {
        fontSize: 20,
        fontWeight: "bold"
    },
    innerpaper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        minHeight: 200,
    },
    joinLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "red"
    },
    titleLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "blue"
    }
})


class MyProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomid: this.props.match.params.id,
            user: props.person.user.userId,
            name: props.person.user.firstName,
            bidHistory: [],
            isLoaded: false,
            joinedUsers: [],
            fullData: {},
            time: 100,
            timeLeft: '00:00:00',
            winner: {},
            Declaredwinner: false,
            noWinner: false,
            highBidUser: '',
            highBidAmt: ''

        };

        socket.on('connect', () => {
            console.log('connected react')
        })


    }
    componentDidMount() {
        this.getUsers()

        var self = this;
        //handle to listen updateBid from server socket
        socket.on('updateBid', function (bidObj) {
            //console.log('socket updatebid', bidObj)

            const max = bidObj.reduce((prev, current) => (prev.amount > current.amount) ? prev : current)
            //console.log(max)
            self.setState({ bidHistory: bidObj, highBidUser: max.user.firstName, highBidAmt: max.amount });

        });

        socket.on("new_user", function (data) {
            // console.log('usr joine', data)

            self.setState((prevState) => ({
                joinedUsers: [].concat(prevState.joinedUsers).concat(data)
            }))
        });

        socket.on('ADMIN_MSG', function (data) {
            console.log('admin msg', data)
            self.setState((prevState) => ({
                joinedUsers: [].concat(prevState.joinedUsers).concat(data)
            }))
        })


    }
    timeLeft = (data) => {
        const timeLeft = data
        this.setState({ timeLeft })
        if (timeLeft === '00:00:00') {
            const { bidHistory } = this.state
            if (bidHistory.length !== 0) {
                this.filterBidhistory(this.state.bidHistory)

            }
        }
    }

    // setHighBid = (max) => {
    //     this.setState({ highBid: max })
    // }
    filterBidhistory = (bidHistory) => {
        const filteredUsers = bidHistory.filter(user => {
            return user.hasOwnProperty('amount')
        })
        console.log('filtered users', filteredUsers)
        const highBid = filteredUsers.sort(function (a, b) {
            return b.amount - a.amount
        })
        console.log('high bid', highBid)

        if (highBid.length > 0) {
            const winner = highBid[0]
            this.setState({ winner, Declaredwinner: true })
            const Data = [{
                user: winner.user._id,
                amount: winner.amount
            }]
            const winnerData = {
                sold: Data
            }

            const { _id } = this.state.fullData.product
            axios.put(`/products/${_id}`, winnerData, { headers: { 'x-auth': localStorage.getItem('token') } })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            this.setState({ noWinner: true, Declaredwinner: true })
        }
    }
    getTime = () => {
        console.log('inside getTime function')
        socket.on('CURRENT_TIME', (data) => {
            console.log('inside socket currentTime')
            const time = --data.time
            //console.log('before set state', time)
            this.setState({ time: time })
        })
    }


    getUsers = () => {
        axios.get(`/bidding/session/${this.state.roomid}`)
            .then((response) => {
                console.log('get user', response.data)
                if (response.data.participant) {
                    if (response.data.participant.length > 1) {
                        console.log('insode get')
                        const high = response.data.participant.reduce((prev, current) => (prev.amount > current.amount) ? prev : current)
                        this.setState({
                            bidHistory: response.data.participant, fullData: response.data,
                            highBidUser: high.user.firstName,
                            highBidAmt: high.amount

                        })
                        this.setUser(response.data.participant)
                    }
                    else {
                        this.setState({
                            bidHistory: response.data.participant, fullData: response.data, highBidUser: "--------"
                        })
                        this.setUser(response.data.participant)
                    }

                }
            })
            .catch((err) => {
                console.log('getHistoryerror', err)
            })
    }

    setUser = (data) => {
        // Get the bidhistory and store them in state
        var currentUserID = this.props.person.user.userId
        const self = this
        //console.log('set user first', data)
        const uniqueUser = data.some(p => p.user._id === currentUserID)
        // console.log('unique', uniqueUser)
        if (!uniqueUser) {
            const user = { user: currentUserID }
            const update = [].concat(this.state.bidHistory).concat(user)
            const data = {
                participant: update
            }
            //console.log('inside if unique', data)

            axios.put(`/bidding/session/${self.state.roomid}`, data, { headers: { 'x-auth': localStorage.getItem('token') } })
                .then((response) => {
                    // console.log('set user response', response.data)
                    self.setState({ bidHistory: response.data.participant, fullData: response.data, isLoaded: true })
                    socket.emit('join_room', { id: self.state.roomid, name: self.state.name })

                })
                .catch((err) => {
                    console.log('get historyerror', err)
                    // window.location.reload()
                })
        } else {
            socket.emit('join_room', { id: self.state.roomid, name: self.state.name })
            // socket.emit('GET_TIME', { roomid: self.state.roomid })
            // socket.emit('SET_TIME', { roomid: self.state.roomid, time: self.state.time })
            self.setState({ isLoaded: true })
        }
    }


    saveBid = (bids) => {
        const data = {
            participant: bids
        }
        // console.log('save bid', data)
        axios.put(`/bidding/session/${this.state.roomid}`, data, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                // console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    render() {
        const { classes } = this.props

        // console.log('current', this.state)

        return (
            <React.Fragment>
                <main className={classes.layout}>
                    {this.state.isLoaded &&
                        <>
                            <Paper className={classes.paper}>
                                <Grid container wrap="nowrap" spacing={8}>
                                    <Grid item xs={4} sm={4}>
                                        <Paper className={classes.titlepaper}>
                                            <FormLabel className={classes.titleLabel} >{this.state.fullData.product.name.toUpperCase()},Min &#8377; {this.state.fullData.product.minPrice} </FormLabel>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4} sm={4} sss>
                                        <Paper className={classes.titlepaper}>
                                            <EndTime fullData={this.state.fullData} timeLeft={this.timeLeft} />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <Paper className={classes.titlepaper}>
                                            <FormLabel className={classes.titleLabel} >


                                                High Bid : {this.state.highBidUser} &#8377; {this.state.highBidAmt}

                                            </FormLabel>
                                        </Paper>
                                    </Grid>
                                </Grid>



                            </Paper>
                            <div className={classes.bottompaper}>
                                {!this.state.Declaredwinner ?
                                    <Grid container spacing={24}>
                                        <Grid item xs={12} sm={4}>
                                            <Paper className={classes.innerpaper}>
                                                <BidInput
                                                    bidHistory={this.state.bidHistory}
                                                    roomid={this.state.roomid}
                                                    winner={this.state.winner}
                                                    fullData={this.state.fullData}
                                                    time={this.state.time}
                                                    socket={socket}
                                                    saveBid={this.saveBid}
                                                    user={this.state.user}
                                                    setHighBid={this.setHighBid}
                                                />
                                            </Paper>
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <Paper className={classes.innerpaper}>
                                                <DisplayBid bidHistory={this.state.bidHistory} />
                                            </Paper>
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <Paper className={classes.joinpaper}>
                                                {this.state.joinedUsers.map((user, i) => {
                                                    return <><FormLabel className={classes.joinLabel} key={i + 1}>{user}</FormLabel><br /></>
                                                })}
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid container spacing={24}>
                                        {!this.state.noWinner ?
                                            <Grid item xs={12} sm={12}>
                                                <Paper className={classes.innerpaper}>The Item Is Sold to {this.state.winner.user.firstName} At the Price of {this.state.winner.amount}</Paper>
                                            </Grid>
                                            :
                                            <Grid item xs={12} sm={12}>
                                                <Paper className={classes.innerpaper}>No Bidding Happened to This Current Product</Paper>
                                            </Grid>
                                        }

                                    </Grid>
                                }
                            </div>
                        </>
                    }
                </main>
            </React.Fragment>
        )
    }
}

MyProduct.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        person: state.users
    }
}

export default withStyles(styles)(
    connect(mapStateToProps)(MyProduct));
