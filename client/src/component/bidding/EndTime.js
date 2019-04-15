import React from 'react'
import axios from '../axios/config';
import moment from 'moment'
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    timeLabel: {
        fontSize: 20,
        fontWeight: "bold",
        color: "red"
    },
    titleLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "blue"
    }

})


class EndTime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTime: props.currentTime,

            timeLeft: "00:00:00"
        }
    }
    componentDidMount() {
        axios.get('http://worldclockapi.com/api/json/utc/now')
            .then((response) => {
                this.setState({ currentTime: response.data.currentDateTime }, () => {
                    this.Counter()
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    Counter = () => {
        const { currentTime } = this.state
        const { session } = this.props.fullData
        const productEndTime = this.props.fullData.session.endTime
        const time = moment(currentTime).toISOString()
        const endtime = productEndTime
        const currentDate = moment(currentTime, 'DD-MM-YYYY')
        const currentTimePro = moment(currentTime)


        var interval = 1000;
        var self = this
        var then = moment(time).format('DD/MM/YYYY HH:mm:ss');
        var now = moment(endtime).format('DD/MM/YYYY HH:mm:ss');

        var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        //var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        // console.log('moment duration display', d.hours(), d.minutes(), d.seconds())
        // console.log('ms', ms)
        // console.log('s', s)
        // console.log('d', d)
        const status = (moment(session.date, 'DD-MM-YYYY').isSame(currentDate)
            &&
            moment(currentTimePro).isBetween(session.startTime, session.endTime))

        var clear
        if (status) {
            clearInterval(clear)
            clear = setInterval(function () {

                if (self.state.timeLeft === '00:00:01') {
                    clearInterval(clear)
                    //self.props.timeLeft('0:0:0')
                }
                // console.log('inside setinterval', clear)
                const t = d.subtract(interval, "milliseconds"); //using momentjs substract function
                const Hour = t.hours() < 10 ? '0' + t.hours() : t.hours()
                const Minute = t.minutes() < 10 ? '0' + t.minutes() : t.minutes()
                const Second = t.seconds() < 10 ? '0' + t.seconds() : t.seconds()

                const timeLeft = Hour + ':' + Minute + ':' + Second
                self.setState({ timeLeft })
                self.props.timeLeft(timeLeft)
            }, interval);
        }
        else {
            self.props.timeLeft('00:00:00')
        }
    }

    render() {
        const { classes } = this.props
        return (
            <>
                <FormLabel className={classes.titleLabel}> Time Left :</FormLabel> <FormLabel className={classes.timeLabel}>{this.state.timeLeft}</FormLabel>

            </>
        )
    }
}

EndTime.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EndTime);