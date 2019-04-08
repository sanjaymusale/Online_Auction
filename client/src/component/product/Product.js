import React from "react"
import axios from "../axios/config";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { isEmpty } from 'lodash'

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



    render() {
        const { name, minPrice, description, _id } = this.state.product
        const { startTime, date, endTime } = this.state.session
        console.log(this.state)
        return (
            <div>
                <ul>
                    <li> Name : {name}</li>
                    <li> minPrice : {minPrice}</li>
                    <li>description : {description} </li>
                    {!isEmpty(date) &&
                        <>
                            <li>Session Date : {moment(date).format('DD-MM-YYYY')}</li>
                            <li>Session Start Time : {moment(startTime).format('hh:mm A')}</li>
                            <li>Session End Time : {moment(endTime).format('hh:mm A')}</li>
                        </>
                    }
                    <li>Approved : {this.state.status}</li>
                </ul>
                <Link to={`/product/edit/${_id}`}>Edit</Link> | <Link to='/product/list'>Back</Link>
                <button onClick={this.handleDelete}>Delete</button>
                {
                    (this.state.status === 'Approved' && this.props.user.user.role === 'user' && isEmpty(date)) && <Link className="btn btn-primary">Add Time Slot</Link>
                }
                {this.props.user.user.role === 'admin' &&
                    <>
                        <button onClick={this.handleApprove} disabled={this.state.status === "Approved" ? true : false}>Approve</button>
                        <button onClick={this.handleReject} disabled={this.state.status === "Rejected" ? true : false}>Reject</button>
                    </>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}
export default connect(mapStateToProps)(ProductDetail)