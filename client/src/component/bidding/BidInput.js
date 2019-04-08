import React from 'react'

export default
    class BidInput extends React.Component {
    constructor() {
        super()
        this.state = {
            bidPrice: '',
            buttonDisable: false,
            bidPriceError: false,
            bidPriceEmpty: ''
        }
    }

    BidChange = (e) => {
        const bidPrice = e.target.value
        this.setState({ bidPrice })
        if (this.props.bidHistory) {
            const highBid = this.highestBid()
            if (bidPrice <= highBid.amount) {
                this.setState({ bidPriceError: true, buttonDisable: true, bidPriceEmpty: '' })
            } else {
                this.setState({ bidPriceError: false, buttonDisable: false, bidPriceEmpty: '' })
            }
        }
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

        this.setState({
            ...this.state,
            ...errors
        })
        return isError
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


            this.props.saveBid(updateBids)
            this.setState({ bidPrice: '', buttonDisable: false })
        }
    }

    render() {
        return (
            <>
                <h2>bidding Room</h2>
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