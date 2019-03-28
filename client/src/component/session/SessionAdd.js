import React from 'react'
import SessionForm from './SessionForm';
import axios from '../axios/config';

const SessionAdd = () => {
    function handleSubmit(data) {
        axios.post('/sessions', data)
            .then((response) => {
                console.log(response.data)

            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <SessionForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default SessionAdd