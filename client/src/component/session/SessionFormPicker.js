import React from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import moment from 'moment'
import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider,
} from "material-ui-pickers";
import axios from "../axios/config";

class DatePick extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedDate: moment().toISOString(),
            selectedTime: moment().toISOString(),
            currentTime: '',
            isLoaded: false,
            
        }
    }
    componentDidMount() {
        axios.get('http://worldclockapi.com/api/json/utc/now')
            .then((res) => {
                // this.setState({ currentTime: res.data.currentDateTime, selectedDate: moment(res.data.currentDateTime).add(1, 'd'), isLoaded: true })
                this.setState(() => ({
                    currentTime: moment(res.data.currentDateTime).toISOString(),
                    selectedDate: moment(res.data.currentDateTime).add(1, 'd').toISOString(),
                    selectedTime: moment(res.data.currentDateTime).toISOString(),
                    isLoaded: true
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    handleDateChange = (date) => {
        const selectedDate = moment(date).toISOString()
        this.setState({ selectedDate });
    }
    handleTimeChange = (time) => {
        const selectedTime = moment(time).toISOString()
        this.setState({ selectedTime });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        var end = moment(this.state.selectedTime).add(1, 'hours').toISOString()
        const data = {
            date: this.state.selectedDate,
            startTime: this.state.selectedTime,
            endTime: end
        }

        this.props.handleSubmit(data)
    }

    render() {
        console.log('session', this.state)
        return (

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="pickers">

                    {/* <DatePicker value={this.state.selectedDate} onChange={this.handleDateChange} minDate={moment(this.state.currentTime).add(1, 'd')} /> */}

                    <DatePicker value={this.state.selectedDate} onChange={this.handleDateChange} />
                    <TimePicker value={this.state.selectedTime} onChange={this.handleTimeChange} />

                    <button onClick={this.handleSubmit}>Submit</button>

                </div>
            </MuiPickersUtilsProvider>
        );
    }
}
export default DatePick