import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import moment from 'moment'

import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider,
} from "material-ui-pickers";

export default class FormDialog extends React.Component {
  constructor(props){
    super(props)
      this.state={
            open: props.open,
            selectedDate: moment().toISOString(),
            selectedTime: moment().toISOString(),
            currentTime: '',
            isLoaded: false,
            id:props.id
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
        var end = moment(this.state.selectedTime).add(10, 'minutes').toISOString()
        const data = {
            date: this.state.selectedDate,
            startTime: this.state.selectedTime,
            endTime: end
        }

        this.props.handleSubmit(data)
    }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
     this.props.history.push(`/userProduct/${this.props.id}`)
  };
componentWillReceiveProps(next){
  //console.log('receive',next)
    const status = next.open
    this.setState({ open:status})
  }
  render() {
    //console.log('sessionForm',this.state)
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Date And Time</DialogTitle>
          <DialogContent>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>


                    {/* <DatePicker value={this.state.selectedDate} onChange={this.handleDateChange} minDate={moment(this.state.currentTime).add(1, 'd')} /> */}

                    <DatePicker value={this.state.selectedDate} onChange={this.handleDateChange} />
                    <TimePicker value={this.state.selectedTime} onChange={this.handleTimeChange} />

                    <Button onClick={this.handleSubmit} size="small" variant="contained" color="primary" >Submit</Button>


            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
