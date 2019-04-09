import React from 'react'
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
            joinedUsers: [],
            fullData: {},
            time: 100
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
            //console.log('socket updatebid', bidObj)
            self.setState({ bidHistory: bidObj });

        });

        socket.on("new_user", function (data) {
            // console.log('usr joine', data)

            self.setState((prevState) => ({
                joinedUsers: [].concat(prevState.joinedUsers).concat(data)
            }))
        });





        // })
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
                    if (response.data.participant.length === 1) {
                        socket.emit('SET_TIME', { roomid: self.state.roomid, time: self.state.time })
                    }
                })
                .catch((err) => {
                    console.log('get historyerror', err)
                    // window.location.reload()
                })
        } else {
            socket.emit('join_room', { id: self.state.roomid, name: self.state.name })
            //socket.emit('SET_TIME', { roomid: self.state.roomid, time: self.state.time })
            socket.emit('SET_TIME', { roomid: self.state.roomid, time: self.state.time })
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
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })

    }
    render() {

        return (
            <>{this.state.isLoaded &&
                <div>
                    <p>{this.state.fullData.product.name}</p>
                    {this.state.joinedUsers.map((user, i) => {
                        return <p key={i + 1}>{user}</p>
                    })}
                    <BidInput
                        bidHistory={this.state.bidHistory}
                        roomid={this.state.roomid}
                        fullData={this.state.fullData}
                        time={this.state.time}
                        socket={socket}
                        saveBid={this.saveBid}
                        user={this.state.user}
                        socket={socket}
                    />
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