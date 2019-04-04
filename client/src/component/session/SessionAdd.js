import React from 'react'

import axios from '../axios/config';
import DatePick from './SessionFormPicker';


const SessionAdd = (props) => {
    const id = props.match.params.id

    function handleSubmit(data) {

        data.product = id

        axios.post('/sessions', data, { headers: { "x-auth": localStorage.getItem("token") } })
            .then((response) => {
                const data = {
                    session: response.data._id
                }
                console.log(response.data)
                axios.put(`/products/${id}`, data, { headers: { "x-auth": localStorage.getItem("token") } })
                    .then((response) => {
                        console.log(response)
                        // props.history.push(`/product/${id}`)

                    })
                    .catch((err) => {
                        console.log(err)
                    })

            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <DatePick handleSubmit={handleSubmit} />
        </>
    )
}

export default SessionAdd