import React from 'react'
import jwtDecode from 'jwt-decode'
import { connect } from 'react-redux'
import axios from '../axios/config';
import BidInput from './BidInput';

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
            fullData: {}
        };

        socket.on('connect', () => {
            console.log('connected react')
        })
        // var room = socket.rooms[this.state.roomid]

        // console.log(room)


        //     socket.on('RECEIVE_MESSAGE', function (data) {
        //         console.log('receive msg', data)
        //         addMessage(data);

        //     });

        //     socket.on('SEND_MESSAGE', function (data) {
        //         console.log('send mess', data)
        //         addMessage(data);
        //     });

        //     const addMessage = data => {
        //         console.log(data);
        //         this.setState({ messages: [...this.state.messages, data] });
        //         console.log(this.state.messages);
        //     };


        // }

        // sendMessage = (ev) => {
        //     ev.preventDefault();
        //     const roomid = this.props.match.params.id
        //     socket.emit('SEND_MESSAGE', {
        //         room: roomid,
        //         user: this.state.user,
        //         firstName: this.state.name,
        //         message: this.state.message
        //     })

        //     this.setState({ message: '' });

    }
    componentDidMount() {
        this.getUsers()

        var self = this;
        //handle to listen updateBid from server socket
        socket.on('updateBid', function (bidObj) {
            console.log('socket updatebid', bidObj)
            self.setState({ bidHistory: bidObj });

        });
        //Emits 'getTime' to server socket
        // socket.emit('getTime', 'test');
        // //handle to listen 'remaining time' from server socket
        // socket.on('remainingTime', function (timeFromServer) {
        //     self.setState({ timeRemain: timeFromServer });
        // });
    }
    getTime = () => {

    }
    getUsers = () => {
        axios.get(`/bidding/session/${this.state.roomid}`)
            .then((response) => {
                console.log('get user', response.data)
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
        const uniqueUser = data.some(p => p.user === currentUserID)
        console.log('unique', uniqueUser)
        if (!uniqueUser) {
            const user = { user: currentUserID }
            // const update = [].concat(this.state.bidHistory).concat(user)
            // const data = {
            //     participant: update
            // }
            console.log('inside if unique', data)

            axios.post(`/bidding/session/${self.state.roomid}`, user, { headers: { 'x-auth': localStorage.getItem('token') } })
                .then((response) => {
                    console.log('set user response', response.data)
                    self.setState({ bidHistory: response.data.participant, fullData: response.data, isLoaded: true })
                    //socket.emit('join_room', { id: self.state.roomid })
                })
                .catch((err) => {
                    console.log('get historyerror', err)
                    // window.location.reload()
                })
        } else {
            socket.emit('join_room', { id: self.state.roomid })
            self.setState({ isLoaded: true })
        }
    }

    saveBid = (bids) => {
        const data = {
            participant: bids
        }
        console.log('save bid', data)
        axios.put(`/bidding/session/${this.state.roomid}`, data, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })

    }
    render() {
        console.log('current bidding state', this.state)
        return (
            <>{this.state.isLoaded &&
                <BidInput
                    bidHistory={this.state.bidHistory}
                    roomid={this.state.roomid}
                    fullData={this.state.fullData}
                    socket={socket}
                    saveBid={this.saveBid}
                    user={this.state.user}
                />
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