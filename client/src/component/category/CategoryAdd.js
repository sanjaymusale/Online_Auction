import React from 'react'
import axios from '../axios/config';
import FormCategory from './CategoryForm'


class AddCategory extends React.Component {

    handleSubmit = (data) => {
        axios.post("/category", data, { headers: { "x-auth": localStorage.getItem("token") } })
            .then(response => {
                const data = response.data
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>add</h2>
                <FormCategory handleSubmit={this.handleSubmit} />

            </div>
        )

    }
}
export default AddCategory