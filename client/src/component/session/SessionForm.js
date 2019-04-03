import React from 'react'
import { time } from './Time'
import axios from '../axios/config';
// const end = [].concat(time)
import { Button, Form, Label, Input, FormText } from 'reactstrap'

export default
    class SessionForm extends React.Component {
    constructor() {
        super()
        this.state = {
            sessionData: [],
            start: '',
            time: time,
            end: '',
            date: '',
            EndTime: []
        }
    }
    componentDidMount() {
        axios.get('/sessions', { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log('componentdid', response.data)
                this.setState(() => ({ sessionData: response.data }))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    handleStart = (e) => {
        const start = e.target.value
        var EndTime
        var index = this.state.time.indexOf(start)
        EndTime = this.state.end.filter(e => e === this.state.time[index + 1])
        this.setState(() => ({ start, EndTime }))
        // console.log('latest', EndTime)

    }
    handleDate = (e) => {
        const date = e.target.value
        const sessionDate = this.state.sessionData.filter(session => session.date === date)

        const uniqueSessions = [...new Set(sessionDate.map(item => item.startSession))];

        const startTime = time.filter(t => !uniqueSessions.includes(t))

        this.setState(() => ({ date, time: startTime, end: startTime }))
    }

    handleEnd = (e) => {
        const end = e.target.value
        //console.log('end', end)
        this.setState(() => ({ end }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            startSession: this.state.start,
            endSession: this.state.end,
            date: this.state.date
        }
        console.log(formData)
        this.props.handleSubmit(formData)
        this.setState(() => ({
            start: '',
            date: '',
            end: ''
        }))
    }

    render() {
        // console.log('state', this.state)
        console.log('time', time)

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5"></div>
                        <Form onSubmit={this.handleSubmit}>
                            <Label>
                                Date :<br /><Input type="date" value={this.state.date} onChange={this.handleDate} />
                            </Label><br />
                            <Label>
                                Start Time :<br />
                                <select onChange={this.handleStart} value={this.state.start}>
                                    <option value="" >Select Start Time</option>
                                    {
                                        this.state.time.map((t, i) => {
                                            if (i !== time.length - 1) {
                                                return <option key={t} value={t}>{t}</option>
                                            }

                                        })
                                    }
                                </select>
                            </Label><br />
                            <Label>
                                End Time :<br />
                                <select onChange={this.handleEnd} value={this.state.end}>
                                    <option value="">Select End Time</option>
                                    {
                                        this.state.EndTime.map((t, i) => {
                                            return <option key={t} value={t}>{t}</option>
                                        })
                                    }
                                </select>
                            </Label><br />
                            <Button type='submit' color="primary">submit</Button>
                            {/* <button>Submit</button> */}
                        </Form>
                    </div>
                </div>

            </div>
        )
    }
}