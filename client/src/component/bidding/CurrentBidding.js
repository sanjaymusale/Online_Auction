import React from 'react'
import jwtDecode from 'jwt-decode'
import { connect } from 'react-redux'


const SocketURL = 'http://localhost:3001/'

const io = require('socket.io-client');
const socket = io(SocketURL);

class CurrentBidding extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.person.user.userId,
            name: props.person.user.firstName,
            message: '',
            messages: []
        };

        // console.log(this.state)
        const roomid = this.props.match.params.id
        this.socket = io(SocketURL);
        this.socket.on('connect', () => {
            console.log('connected react')
        })

        this.socket.emit('join_room', { id: roomid })

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            console.log('receive msg', data)
            addMessage(data);

        });

        this.socket.on('SEND_MESSAGE', function (data) {
            console.log('send mess', data)
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };


    }

    sendMessage = (ev) => {
        ev.preventDefault();
        const roomid = this.props.match.params.id
        this.socket.emit('SEND_MESSAGE', {
            room: roomid,
            user: this.state.user,
            firstName: this.state.name,
            message: this.state.message
        })

        this.setState({ message: '' });

    }

    render() {

        return (
            <>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        person: state.users
    }
}

export default connect(mapStateToProps)(CurrentBidding)