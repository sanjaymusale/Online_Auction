import React from 'react'
import { time } from './Time'
import axios from '../axios/config';
// const end = [].concat(time)

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

    handleDate = (e) => {
        const date = e.target.value

        const sessionDate = this.state.sessionData.filter(session => session.date === date)

        const uniqueSessions = [...new Set(sessionDate.map(item => item.startSession))];
        console.log('unique Session', uniqueSessions)

        const startTime = time.filter(t => !uniqueSessions.includes(t))
        console.log("startTime", startTime)
        this.setState(() => ({ date, time: startTime, end: startTime }))
    }
    handleStart = (e) => {
        const start = e.target.value
        var EndTime
        var index = this.state.time.indexOf(start)
        EndTime = this.state.end.filter(e => e === this.state.time[index + 1])
        this.setState(() => ({ start, EndTime }))
        console.log('latest', EndTime)

    }


    handleEnd = (e) => {
        const end = e.target.value
        console.log('end', end)
        this.setState(() => ({ end }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            startSession: this.state.start,
            endSession: this.state.end,
            date: this.state.date
        }
        // console.log(formData)
        this.props.handleSubmit(formData)
        this.setState(() => ({
            start: '',
            date: '',
            end: ''
        }))
    }

    render() {
        console.log('state', this.state)
        console.log('time', this.state.time)

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Date :<input type="date" value={this.state.date} onChange={this.handleDate} />
                    </label><br />
                    <label>
                        Start Time :
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
                    </label><br />
                    <label>
                        End Time :
                        <select onChange={this.handleEnd} value={this.state.end}>
                            <option value="">Select End Time</option>
                            {
                                this.state.EndTime.map((t, i) => {
                                    return <option key={t} value={t}>{t}</option>
                                })
                            }
                        </select>
                    </label><br />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}