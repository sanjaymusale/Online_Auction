import React from 'react'
import axios from '../axios/config';
import FormCategory from './CategoryFormmt'
import { Link } from 'react-router-dom'


class AddCategory extends React.Component {

    handleSubmit = (data) => {
        axios.post("/category", data, { headers: { "x-auth": localStorage.getItem("token") } })
            .then(response => {
                const data = response.data
                console.log(data)
                this.props.history.push("/category")

            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                {/* <h2>add</h2> */}
                <FormCategory handleSubmit={this.handleSubmit} title="Add New Category" />
              

            </div>
        )

    }
}
export default AddCategory
