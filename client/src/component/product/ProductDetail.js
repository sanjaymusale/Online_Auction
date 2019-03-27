import React from "react"
import axios from "../axios/config";
import { Link } from 'react-router-dom'

class ProductDetail extends React.Component {
    constructor() {
        super()
        this.state = {
            product: {},
            session: {},
            isApproved: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        console.log('id', id)
        Promise.all([axios.get(`/products/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } }),
        axios.get(`/sessions/product/${id}`)])
            .then((response) => {
                this.setState(() => ({ product: response[0].data, session: response[1].data, isApproved: response[0].data.approved }))
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
            approved: true
        }
        axios.patch(`/products/${id}`, data, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response.data)
                this.setState(() => ({ isApproved: response.data.approved }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { name, minPrice, description, _id, approved } = this.state.product
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
                    <li>Approved : {this.state.isApproved ? 'Approved' : 'Pending'}</li>
                </ul>
                <Link to={`/product/edit/${_id}`}>Edit</Link> | <Link to='/product/list'>Back</Link>
                <button onClick={this.handleDelete}>Delete</button>
                <button onClick={this.handleApprove} disabled={this.state.isApproved}>Approve</button>
            </div>
        )
    }
}

export default ProductDetail