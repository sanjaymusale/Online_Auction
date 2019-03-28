import React from 'react'
import axios from '../axios/config';
import { Link } from 'react-router-dom'


export default class SessionShow extends React.Component {
    constructor() {
        super()
        this.state = {
            sessions: []
        }



    }
    componentDidMount() {
        axios.get('/sessions', { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                const data = response.data
                //console.log(data)
                this.setState(() => ({ sessions: data }))



            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const session = this.state.sessions
        console.log(session)

        return (
            <div>
                <br />
                <table border="2">
                    <thead >
                        <tr>
                            <td>#</td>
                            <td>Date</td>
                            <td>StartSession</td>
                            <td>EndSession</td>
                            <td>edit</td>
                            <td>delete</td>


                        </tr>


                    </thead>
                    <tbody>

                        {session.map((sess, index) => {
                            return (
                                <tr key={sess._id}>
                                    <td>{index + 1}</td>
                                    <td>{sess.date}</td>
                                    <td>{sess.startSession}</td>
                                    <td>{sess.endSession}</td>
                                    <td><Link to={`/session_edit/${sess._id}`}>edit</Link></td>
                                    <td><Link to="/session_delete">delete</Link></td>
                                </tr>
                            )
                        })}

                    </tbody>

                </table>
                {/* <ul>
                    {session.map(sess => { return <li key={sess._id}> Start : {sess.startSession}  End : {sess.endSession} </li> })}
                </ul> */}

            </div>
        )
    }

}