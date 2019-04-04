import React from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import moment from 'moment'
import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider,
} from "material-ui-pickers";

class DatePick extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedDate: moment().toISOString(),
            selectedTime: moment().toISOString()
        }
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
        // console.log('date', data)
        this.props.handleSubmit(data)
    }
    //const [selectedDate, handleDateChange] = useState(new Date());
    render() {
        //console.log('date', moment(this.state.selectedDate).format('YYYY-MM-DD'))
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="pickers">
                    <DatePicker value={this.state.selectedDate} onChange={this.handleDateChange} />
                    <TimePicker value={this.state.selectedTime} onChange={this.handleTimeChange} />
                    {/* <DateTimePicker value={this.state.selectedDate} onChange={this.handleDateChange} /> */}
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </MuiPickersUtilsProvider>
        );
    }
}
export default DatePick