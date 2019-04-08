import React from 'react'
import axios from '../axios/config';
export default class SessionEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            session: {},
            isLoaded: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/sessions/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                const data = response.data
                //console.log(session)
                this.setState(() => ({ session: data, isLoaded: true }))
            })
            .catch((err) => {
                console.log(err)
            })

    }





    render() {
        //const { date, startSession, endSession } = this.state.session
        //console.log(date, startSession)
        return (
            <div>
                <h2>edit</h2>
            </div>
        )
    }


}
