import React from 'react'
import validator from 'validator'
// import CountDown from './ProgressBarTimer'
// import { isEmpty } from 'lodash'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
    button: {
        marginTop: 10,

    },
    error: {
        color: "red",
        fontSize: "14px",
        marginTop: "5px"
    }
})

class BidInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bidPrice: '',
            buttonDisable: false,
            bidPriceError: false,
            bidPriceEmpty: '',
            time: props.time,
            winner: this.props.winner
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
        if (this.props.bidHistory) {
            //console.log('inside bidchange if', this.props.bidHistory)
            const highBid = this.highestBid()
            //console.log('highBid', highBid)
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
        if (this.state.bidPrice.length > 0 && !validator.isNumeric(this.state.bidPrice)) {
            isError = true;
            errors.bidPriceEmpty = "Enter Only Number";
        }
        if (this.state.bidPrice.length > 0 && (this.minPriceCheck())) {
            isError = true;
            errors.bidPriceEmpty = "Bid Should Be more than Min price";
        }


        this.setState({
            ...this.state,
            ...errors
        })
        return isError
    }

    componentWillReceiveProps(nextProp) {
        const winner = nextProp.winner
        this.setState({ winner })

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

            //console.log('bid', updateBids)


            this.props.saveBid(updateBids)
            this.setState({ bidPrice: '', buttonDisable: false, bidPriceEmpty: '' })
        }

    }

    render() {
        // console.log('bid input props', this.props)
        const { classes } = this.props
        return (
            <React.Fragment>
                <FormLabel>Place Your Bid</FormLabel>

                {/* <CountDown time={this.state.time} /> */}

                <form>
                    <TextField
                        id="bid"
                        name="bid"
                        value={this.state.bidPrice}
                        onChange={this.BidChange}
                        autoFocus
                    /><br />


                    <Button onClick={this.handleSubmit} className={classes.button} variant="contained" color="primary" disabled={this.state.buttonDisable} >BID</Button><br />
                    <FormLabel className={classes.error}>{this.state.bidPriceError && 'Bid Amount Should be greater'}{this.state.bidPriceEmpty}</FormLabel>

                </form>


            </React.Fragment>
        )
    }

}

BidInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BidInput);
