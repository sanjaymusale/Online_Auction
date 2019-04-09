import React from 'react'
import validator from 'validator'
import CountDown from './ProgressBarTimer'

const SocketURL = 'http://localhost:3001/'

const io = require('socket.io-client');
const socket = io(SocketURL);
export default
    class BidInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bidPrice: '',
            buttonDisable: false,
            bidPriceError: false,
            bidPriceEmpty: '',
            time: props.time
        }
    }

    minPriceCheck = () => {
        const { minPrice } = this.props.fullData.product
        if (this.state.bidPrice <= minPrice) {
            return true
        }
        else {
            return false
        }
    }

    BidChange = (e) => {
        const bidPrice = e.target.value
        this.setState({ bidPrice })
        // if (this.props.bidHistory) {
        //     //console.log('inside bidchange if', this.props.bidHistory)
        //     const highBid = this.highestBid()
        //     //console.log('highBid', highBid)
        //     if (bidPrice <= highBid.amount) {
        //         this.setState({ bidPriceError: true, buttonDisable: true, bidPriceEmpty: '' })
        //     } else {
        //         this.setState({ bidPriceError: false, buttonDisable: false, bidPriceEmpty: '' })
        //     }
        // }
    }

    highestBid = () => {

        const max = this.props.bidHistory.reduce((prev, current) => (prev.amount > current.amount) ? prev : current)
        return max
    }

    validate = () => {
        let isError = false;
        const errors = {
            bidPriceEmpty: '',
        }
        if (this.state.bidPrice.length === 0) {
            isError = true;
            errors.bidPriceEmpty = "Insert Your Bid";
        }
        if (this.state.bidPrice.length > 0 && !validator.isNumeric(this.state.bidPrice)) {
            isError = true;
            errors.bidPriceEmpty = "Enter Only Number";
        }
        if (this.state.bidPrice.length > 0 && validator.isFloat(this.state.bidPrice)) {
            isError = true;
            errors.bidPriceEmpty = "Enter Only Integer Number";
        }


        this.setState({
            ...this.state,
            ...errors
        })
        return isError
    }

    componentWillReceiveProps(nextProp) {
        var self = this
        //     const time = nextProp.time
        //     //console.log('will receive prop time', time)
        //     this.setState({ time: time }, () => {
        //         if (time > 0) {
        //             //console.log('after bid input setstate', this.state.time)
        //             setTimeout(() => {
        //                 //nextProp.socket.emit('SET_TIME', { roomid: nextProp.roomid, time: time })
        //                 nextProp.socket.emit('CURRENT_TIME', { roomid: nextProp.roomid, time: time })
        //             }, 1000);
        //         }
        //     })
        socket.on('CURRENT_TIME', (data) => {
            const time = --data.time
            //console.log('before set state', time)
            self.setState({ time: time }, () => {
                if (time > 0) {
                    //console.log('after bid input setstate', this.state.time)
                    setTimeout(() => {
                        //nextProp.socket.emit('SET_TIME', { roomid: nextProp.roomid, time: time })
                        io.sockets.in(self.props.roomid).emit('CURRENT_TIME', { roomid: self.props.roomid, time: time })
                    }, 1000);
                }
            })
        })

    }
    componentDidMount() {
        var self = this

        // socket.on("GET_TIME", (data) => {
        //     //console.log('current bidding state', this.state.time)
        //     //console.log('get time', data)
        //     const time = --data.time
        //     //console.log('before set state', time)
        //     self.setState({ time: time })

        // })

        // socket.on('CURRENT_TIME', (data) => {
        //     const time = --data.time
        //     //console.log('before set state', time)
        //     self.setState({ time: time }, () => {
        //         if (time > 0) {
        //             //console.log('after bid input setstate', this.state.time)
        //             setTimeout(() => {
        //                 //nextProp.socket.emit('SET_TIME', { roomid: nextProp.roomid, time: time })
        //                 io.sockets.in(self.props.roomid).emit('CURRENT_TIME', { roomid: self.props.roomid, time: time })
        //             }, 1000);
        //         }
        //     })
        // })

    }

    handleSubmit = (e) => {
        e.preventDefault()
        const err = this.validate()

        if (!err) {


            const data = {
                amount: this.state.bidPrice
            }
            //console.log('handlesubmit bidinput', data)
            const updateBids = this.props.bidHistory.map(bid => {
                if (bid.user._id === this.props.user) {
                    return { ...bid, ...data }
                } else {
                    return bid
                }
            })

            console.log('bid', updateBids)

            this.props.saveBid(updateBids)
            this.setState({ bidPrice: '', buttonDisable: false, bidPriceEmpty: '' })
        }

    }

    render() {
        console.log('bid input props', this.props)
        return (
            <>
                <h2>bidding Room</h2>
                <CountDown time={this.state.time} />
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.bidPrice} onChange={this.BidChange} />

                    <button disabled={this.state.buttonDisable} >BID</button><br />
                    <p>{this.state.bidPriceError && 'Bid Amount Should be greater'}{this.state.bidPriceEmpty}</p>

                </form>
                {this.props.bidHistory && this.props.bidHistory.sort(function (a, b) {
                    return b.amount - a.amount
                }).map((bid, i) => {

                    if (bid.amount) {
                        return <div key={i}>{bid.user.firstName}: {bid.amount}</div>
                    }
                    else {
                        return
                    }


                })}
            </>
        )
    }

}