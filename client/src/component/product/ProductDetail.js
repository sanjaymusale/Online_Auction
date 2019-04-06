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
            category: {},
            status: '',
            time: ''
        }
    }


    componentDidMount() {
        const id = this.props.match.params.id
        // console.log('id', id)
        axios.get(`/products/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                this.setState(() => ({
                    product: response.data,
                    status: response.data.status,
                    category: response.data.category,
                    session: response.data.session,

                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    handleDelete = () => {
        if (!isEmpty(this.state.session)) {
            axios.get('http://worldclockapi.com/api/json/utc/now')
                .then((response) => {
                    const currentDateTime = response.data.currentDateTime
                    //console.log('current', currentDateTime)
                    const { startTime, endTime, date } = this.state.session
                    const currentDate = moment(currentDateTime, 'DD-MM-YYYY')
                    const currentTime = moment(currentDateTime)
                    // console.log('currentDate', currentDate, 'currentTime', currentTime)

                    const biddingStartDate = moment(date, 'DD-MM-YYYY')
                    const biddingStartTime = moment(startTime)
                    const biddingEndTime = moment(endTime)
                    //console.log(biddingStartDate, biddingStartTime, biddingEndTime)

                    const datestatus = currentDate.isSame(biddingStartDate)
                    const timestatus = currentTime.isBetween(biddingStartTime, biddingEndTime)

                    if (datestatus && timestatus) {
                        alert('Product Cannot be Deleted as it is in Bidding Process')

                    } else {
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
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
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
        // const { startTime, date, endTime } = this.state.session
        const { name: categoryName } = this.state.category

        //console.log(this.state)
        return (
            <div>
                <ul>
                    <li> Name : {name}</li>
                    <li> minPrice : {minPrice}</li>
                    <li>description : {description} </li>
                    <li>Category : {categoryName}</li>
                    {!isEmpty(this.state.session) &&
                        <>
                            <li>Session Date : {moment(this.state.session.date).format('DD-MM-YYYY')}</li>
                            <li>Session Start Time : {moment(this.state.session.startTime).format('hh:mm A')}</li>
                            <li>Session End Time : {moment(this.state.session.endTime).format('hh:mm A')}</li>
                        </>
                    }
                    <li>Approved : {this.state.status}</li>
                </ul>
                {this.props.user.user.role !== 'admin' &&
                    <>
                        <Link to={`/product/edit/${_id}`}>Edit</Link> | <Link to='/product/list'>Back</Link>
                        <button onClick={this.handleDelete}>Delete</button>
                    </>
                }
                {
                    (this.state.status === 'Approved' && this.props.user.user.role === 'user' && isEmpty(this.state.session)) && <Link to={`/session/add/${_id}`} className="btn btn-primary">Add Time Slot</Link>
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