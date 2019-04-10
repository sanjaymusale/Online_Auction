import React from 'react'
import { connect } from 'react-redux'
import axios from '../axios/config';
import BidInput from './BidInput';
import EndTime from './EndTime';
import DisplayBid from './DisplayBid';
//import { isEmpty } from 'lodash'

// import io from 'socket.io-client'

const SocketURL = 'http://localhost:3001/'

const io = require('socket.io-client');
const socket = io(SocketURL);

class CurrentBidding extends React.Component {
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
            noWinner: false

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
            self.setState({ bidHistory: bidObj });

        });

        socket.on("new_user", function (data) {
            // console.log('usr joine', data)

            self.setState((prevState) => ({
                joinedUsers: [].concat(prevState.joinedUsers).concat(data)
            }))
        });


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
                if (response.data.participant)

                    this.setState({ bidHistory: response.data.participant, fullData: response.data })
                this.setUser(response.data.participant)
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
                    // if (response.data.participant.length === 1) {
                    //     socket.emit('SET_TIME', { roomid: self.state.roomid, time: self.state.time })
                    // } else {
                    //     // socket.on('CURRENT_TIME', (data) => {
                    //     //     this.setState({ time: data.time })
                    //     // })
                    //     this.getTime()
                    // }
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

    calculateHighestBid = () => {
        const timeLeft = this.state.timeLeft
        //if (timeLeft === )
    }

    saveBid = (bids) => {
        const data = {
            participant: bids
        }
        // console.log('save bid', data)
        axios.put(`/bidding/session/${this.state.roomid}`, data, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })

    }
    render() {
        //console.log('current Bid', this.state)

        return (
            <>{this.state.isLoaded &&
                <div>
                    <p>{this.state.fullData.product.name}</p>
                    {this.state.joinedUsers.map((user, i) => {
                        return <p key={i + 1}>{user}</p>
                    })}
                    <EndTime fullData={this.state.fullData} timeLeft={this.timeLeft} />
                    {!this.state.Declaredwinner ?
                        <BidInput
                            bidHistory={this.state.bidHistory}
                            roomid={this.state.roomid}
                            winner={this.state.winner}
                            fullData={this.state.fullData}
                            time={this.state.time}
                            socket={socket}
                            saveBid={this.saveBid}
                            user={this.state.user}
                            socket={socket}
                        />
                        :
                        <>
                            {!this.state.noWinner ?
                                <p>The Item Is Sold to {this.state.winner.user.firstName} At the Price of {this.state.winner.amount}</p>
                                :
                                <p>No Bidding Happened to This Current Product</p>
                            }
                        </>
                    }
                    <DisplayBid bidHistory={this.state.bidHistory} />
                </div>
            }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        person: state.users
    }
}

export default connect(mapStateToProps)(CurrentBidding)
