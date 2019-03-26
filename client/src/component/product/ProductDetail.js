import React from "react"
import axios from "../axios/config";
import { Link } from 'react-router-dom'

class ProductDetail extends React.Component {
    constructor() {
        super()
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        console.log('id', id)
        axios.get(`/products/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response.data)
                this.setState(() => ({ product: response.data }))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    handleDelete = () => {
        const confirm = window.confirm('Are you Sure ??')
        if (confirm) {
            const id = this.props.match.params.id
            axios.delete(`/products/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
                .then((response) => {
                    // console.log(response.data)
                    this.props.history.push('/product/list')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        const { name, minPrice, description, _id } = this.state.product
        return (
            <div>
                <ul>
                    <li> Name : {name}</li>
                    <li> minPrice : {minPrice}</li>
                    <li>description : {description} </li>
                </ul>
                <Link to={`/product/edit/${_id}`}>Edit</Link> | <Link to='/product/list'>Back</Link>
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}

export default ProductDetail