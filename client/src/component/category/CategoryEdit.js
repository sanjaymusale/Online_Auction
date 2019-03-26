import React from 'react'
import axios from '../axios/config';
import FormCategory from './CategoryForm'



class EditCategory extends React.Component {
    constructor() {
        super()
        this.state = {
            category: {},
            isLoaded: false
        }

    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/category/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                const data = response.data.category
                console.log(data)
                this.setState(() => ({ category: data, isLoaded: true }))
            })
    }
    handleSubmit = (data) => {
        const id = this.state.category._id
        axios.put(`/category/${id}`, data, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }


    render() {





        return (
            <div>
                <h2>edit</h2>
                {this.state.isLoaded &&
                    <FormCategory name={this.state.category.name} handleSubmit={this.handleSubmit} />}


            </div>
        )

    }
}
export default EditCategory