import React from 'react'

export default
    class DisplayBid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bidHistory: []
        }
    }

    render() {
        return (
            <div>
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
            </div>
        )
    }
}