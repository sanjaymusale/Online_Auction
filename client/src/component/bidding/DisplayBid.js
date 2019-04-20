import React from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
    msgLabel: {
        fontSize: 18,
        color: "blue"
    }
})

class DisplayBid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bidHistory: []
        }
    }

    render() {
        const { classes } = this.props
        //console.log('displaybid',this.props.bidHistory)
        return (
            <React.Fragment>
                {this.props.bidHistory && this.props.bidHistory.sort(function (a, b) {
                    return b.amount - a.amount
                }).map((bid, i) => {

                    if (bid.amount) {
                        return <React.Fragment  key={bid._id}><FormLabel className={classes.msgLabel}>{bid.user.firstName}: &#8377; {bid.amount}</FormLabel><br/></React.Fragment>
                    }
                    else {
                        return <React.Fragment key={bid._id}></React.Fragment>
                    }


                })}
            </React.Fragment>
        )
    }
}

DisplayBid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplayBid);
