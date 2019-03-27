import React from 'react'
import { time } from './Time'
const end = [].concat(time)

export default
    class SessionForm extends React.Component {
    constructor() {
        super()
        this.state = {
            start: '',
            end: '',
            date: '',
            EndTime: []
        }
    }
    handleStart = (e) => {
        const start = e.target.value
        var EndTime
        var index = time.indexOf(start)
        EndTime = end.filter(e => e === time[index + 1])
        this.setState(() => ({ start, EndTime }))
        // console.log('latest', EndTime)

    }
    handleDate = (e) => {
        const date = e.target.value
        this.setState(() => ({ date }))
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
    }

    render() {
        // console.log('state', this.state)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Date :<input type="date" value={this.state.date} onChange={this.handleDate} />
                    </label><br />
                    <label>
                        Start Time :
                        <select onChange={this.handleStart}>
                            <option value="" >Select Start Time</option>
                            {
                                time.map((t, i) => {
                                    if (i !== time.length - 1) {
                                        return <option key={t} value={t}>{t}</option>
                                    }

                                })
                            }
                        </select>
                    </label><br />
                    <label>
                        End Time :
                        <select onChange={this.handleEnd}>
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