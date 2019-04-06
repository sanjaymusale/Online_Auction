import React from 'react'
import jwtDecode from 'jwt-decode'
import { connect } from 'react-redux'
import axios from '../axios/config';

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
            message: '',
            messages: [],
            joinedUsers: [],
            isLoaded: false
        };

        // console.log(this.state)
        const roomid = this.props.match.params.id
        // this.socket = io(SocketURL);
        socket.on('connect', () => {
            console.log('connected react')
        })

        socket.emit('join_room', { id: roomid })

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
        // socket.on('updateBid', function (bidObj) {
        //     self.setState({ bidHistory: bidObj });

        // });
        // //Emits 'getTime' to server socket
        // socket.emit('getTime', 'test');
        // //handle to listen 'remaining time' from server socket
        // socket.on('remainingTime', function (timeFromServer) {
        //     self.setState({ timeRemain: timeFromServer });
        // });
    }
    getUsers = () => {
        axios.get(`/bidding/session/${this.state.roomid}`)
            .then((response) => {
                console.log('set user', response.data)

                this.setUser(response.data.participant)
            })
            .catch((err) => {
                console.log('getHistoryerror', err)
            })
    }

    setUser = (data) => {
        // Get the bidhistory and store them in state
        var currentUserID = this.props.person.user.userId

        const uniqueUser = data.some(p => p.user === currentUserID)
        //console.log('unique', uniqueUser)
        if (!uniqueUser) {
            const participant = { user: currentUserID }
            //console.log('inside if unique', participant)
            axios.post(`/bidding/session/${this.state.roomid}`, participant, { headers: { 'x-auth': localStorage.getItem('token') } })
                .then((response) => {
                    //console.log('set user', response.data)
                    this.setState({ joinedUsers: response.data.participant })
                })
                .catch((err) => {
                    console.log('getHistoryerror', err)

                })
        }
    }
    render() {

        return (
            <>{this.state.isLoaded && <>
                <h2>bidding Room</h2>
                <form onSubmit={this.sendMessage}>
                    <input type="text" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                    <button>Submit</button>
                </form>
                {this.state.messages.map((message, i) => {
                    return (
                        <div key={i}>{message.firstName}: {message.message}</div>
                    )
                })}
            </>
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