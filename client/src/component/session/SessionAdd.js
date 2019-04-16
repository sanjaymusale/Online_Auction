import React from 'react'

import axios from '../axios/config';
import SessionForm from './SessionForm';
import moment from 'moment'

class SessionAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={
            open: false,
            selectedDate: moment().toISOString(),
            selectedTime: moment().toISOString(),
            currentTime: '',
            isLoaded: false,
            id:props.match.params.id
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
                    isLoaded: true,
                    open:true
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleSubmit=(data)=> {
        const id = this.props.match.params.id
        data.product = id

        axios.post('/sessions', data, { headers: { "x-auth": localStorage.getItem("token") } })
            .then((response) => {
                const data = {
                    session: response.data._id
                }
                console.log(response.data)
                axios.put(`/products/${id}`, data, { headers: { "x-auth": localStorage.getItem("token") } })
                    .then((response) => {
                       // console.log(response)
                        this.props.history.push(`/userProduct/${id}`)

                    })
                    .catch((err) => {
                        console.log(err)
                    })

            })
            .catch((err) => {
                console.log(err)
            })
    }
    render(){
       // console.log('add',this.state)
        const {currentTime,selectedDate,selectedTime,open,id} = this.state
        return (
        <>
        { this.state.isLoaded &&
            <SessionForm handleSubmit={this.handleSubmit} currentTime={currentTime} 
            selectedDate={selectedDate} selectedTime={selectedTime} open={open} id={id} history={this.props.history}/>
        }
        </>
    )
    }
    
}

export default SessionAdd