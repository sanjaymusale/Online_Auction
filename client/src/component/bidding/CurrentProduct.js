import React from 'react'
import axios from '../axios/config'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'

export default
    class CurrentProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            sessions: [],
            currentProducts: [],
            isLoaded: false,
            time: ''
        }

    }

    currentBid = () => {
        const { currentDateTime } = this.state.time
        //console.log('current', currentDateTime)

        const currentDate = moment(currentDateTime, 'DD-MM-YYYY')
        const currentTime = moment(currentDateTime)

        // console.log('currentDate', currentDate, 'currentTime', currentTime)

        // const biddingStartDate = moment(date, 'DD-MM-YYYY')
        // const biddingStartTime = moment(startTime)
        // const biddingEndTime = moment(endTime)
        //console.log(biddingStartDate, biddingStartTime, biddingEndTime)

        // const datestatus = currentDate.isSame(biddingStartDate)
        // const timestatus = currentTime.isBetween(biddingStartTime, biddingEndTime)
        //console.log('time', time)
        //console.log('date', date)
        // console.log(currentDaySessions)
        //console.log(Product)
        const BiddingProducts = this.state.products.filter(product => {
            if (!isEmpty(product.session)) {
                return (moment(product.session.date, 'DD-MM-YYYY').isSame(currentDate)
                    &&
                    moment(currentTime).isBetween(product.session.startTime, product.session.endTime))
            }
        })

        console.log(BiddingProducts)

        this.setState(() => ({ currentProducts: BiddingProducts }))
    }


    componentDidMount() {
        Promise.all(
            [
                axios.get('/products', { headers: { 'x-auth': localStorage.getItem('token') } }),
                axios.get('http://worldclockapi.com/api/json/utc/now')
            ])
            .then((response) => {
                //console.log(response)
                //console.log(response.data)
                this.setState(() => ({
                    products: response[0].data.filter(product => product.status === 'Approved'),
                    time: response[1].data,
                    isLoaded: true
                }), () => { this.currentBid() })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        // const { currentProduct } = this.state
        //console.log(this.state)

        return (
            <div>
                {this.state.isLoaded &&
                    <div>
                        {this.state.currentProducts.length === 0 ? 'No Product For Bidding at current Time' :
                            <>
                                {this.state.currentProducts.map(product => {
                                    return (
                                        <div key={product._id}>
                                            Name : {product.name}<br />
                                            Min Price : {product.minPrice}<br />
                                            Date  : {moment(product.session.date).format('DD-MM-YYYY') + ', Start Time :' + moment(product.session.startTime).format('h:mm a') + ', End Time : ' +
                                                moment(product.session.endTime).format('h:mm a')
                                            }<br />
                                            <Link to={`/biddingroom/${product.session._id}`} className="btn btn-primary">Enter Bidding Room</Link><br />
                                        </div>
                                    )
                                })}

                            </>

                        }
                    </div>
                }
            </div >
        )
    }
}