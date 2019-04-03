import React from "react"
import axios from "../axios/config";
import { Link } from 'react-router-dom'

class ProductDetail extends React.Component {
    constructor() {
        super()
        this.state = {
            product: {},
            session: {},
            status: ''
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        // console.log('id', id)
        Promise.all([axios.get(`/products/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } }),
        axios.get(`/sessions/product/${id}`)])
            .then((response) => {
                this.setState(() => ({ product: response[0].data, session: response[1].data, status: response[0].data.status }))
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
    handleApprove = () => {
        const id = this.props.match.params.id
        const data = {
            status: 'Approved'
        }
        axios.put(`/products/${id}`, data, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response.data)
                this.setState(() => ({ status: response.data.status }))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    handleReject = () => {
        const id = this.props.match.params.id
        const data = {
            status: 'Rejected'
        }
        axios.put(`/products/${id}`, data, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response.data)
                this.setState(() => ({ status: response.data.product.status }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { name, minPrice, description, _id } = this.state.product
        const { startSession, date, endSession } = this.state.session
        return (
            <div>
                <ul>
                    <li> Name : {name}</li>
                    <li> minPrice : {minPrice}</li>
                    <li>description : {description} </li>
                    <li>Session Date : {date}</li>
                    <li>Session Start Time : {startSession}</li>
                    <li>Session End Time : {endSession}</li>
                    <li>Approved : {this.state.status}</li>
                </ul>
                <Link to={`/product/edit/${_id}`}>Edit</Link> | <Link to='/product/list'>Back</Link>
                <button onClick={this.handleDelete}>Delete</button>
                <button onClick={this.handleApprove} disabled={this.state.status === "Approved" ? true : false}>Approve</button>
                <button onClick={this.handleReject} disabled={this.state.status === "Rejected" ? true : false}>Reject</button>
            </div>
        )
    }
}

export default ProductDetail