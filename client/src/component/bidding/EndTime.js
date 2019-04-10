import React from 'react'
import axios from '../axios/config';
import moment from 'moment'

export default
    class EndTime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTime: props.currentTime,
            isLoaded: false,
            timeLeft: "0:0:0"
        }
    }
    componentDidMount() {
        axios.get('http://worldclockapi.com/api/json/utc/now')
            .then((response) => {
                this.setState({ currentTime: response.data.currentDateTime, isLoaded: true }, () => {
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
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        // console.log('moment duration display', d.hours(), d.minutes(), d.seconds())
        // console.log('ms', ms)
        // console.log('s', s)
        // console.log('d', d)
        const status = (moment(session.date, 'DD-MM-YYYY').isSame(currentDate)
            &&
            moment(currentTimePro).isBetween(session.startTime, session.endTime))

        var clear
        if (status) {
            clear = setInterval(function () {

                if (self.state.timeLeft === '0:0:1') {
                    clearInterval(clear)
                    //self.props.timeLeft('0:0:0')
                }
                console.log('inside setinterval', clear)
                const t = d.subtract(interval, "milliseconds"); //using momentjs substract function
                const timeLeft = (t.hours() + ':' + t.minutes() + ':' + t.seconds())
                self.setState({ timeLeft })
                self.props.timeLeft(timeLeft)
            }, interval);
        }
        else {
            self.props.timeLeft('0:0:0')
        }
    }

    render() {

        return (
            <div>
                End Time : <p>{this.state.timeLeft}</p>

            </div>
        )
    }
}