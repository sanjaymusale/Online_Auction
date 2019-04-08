import React from 'react'
import io from 'socket.io-client'
import jwtDecode from 'jwt-decode'


const token = localStorage.getItem('token')
const SocketURL = 'http://localhost:3001/'
class CurrentBidding extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: null,
            message: '',
            roomid: this.props.match.params.id,
            messagesData: [],
            user: ''
        }
    }
    componentWillMount() {
       
    }

    componentDidMount() {
        if (token) {
            var user = jwtDecode(token)
            this.setState({ user })
        }
        this.initSocket()
    }

    initSocket = () => {
        const roomid = this.props.match.params.id
        const socket = io(SocketURL)
        socket.on('connect', () => {
            console.log('connected react')
        })

        socket.emit('join_room', { id: roomid })

        this.setState({ socket })
    }
    handleChange = (e) => {
        const message = e.target.value
        this.setState({ message })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { socket } = this.state
        const data = {
            message: this.state.message,
            user: this.state.userid
        }
        socket.emit('message', {
            room: this.state.roomid,
            message: this.state.message,
            user: this.state.user.name
        })

    }

    render() {

        return (
            <>
                <h2>bidding Room</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.message} onChange={this.handleChange} />
                    <button>Submit</button>
                </form>
                <ul>
                    {this.state.messagesData.map(tag => {
                        return tag
                    })}
                </ul>
            </>
        )
    }
}

export default CurrentBidding