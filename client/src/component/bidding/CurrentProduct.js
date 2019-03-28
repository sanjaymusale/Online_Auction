import React from 'react'
import axios from '../axios/config'
import moment from 'moment'

export default
    class CurrentProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            sessions: [],
            currentProduct: null,
            isLoaded: false,
            time: ''
        }

    }

    currentBid = () => {
        const time = moment(this.state.time).format('h A')
        const date = moment(this.state.time).format('YYYY-MM-DD')
        //console.log('time', time)
        //console.log('date', date)
        var Product = null
        const currentDaySessions = this.state.sessions.find(session => session.date === date && session.startSession === time && session.isAlloted === true)
        if (currentDaySessions) {
            Product = this.state.products.find(product => product._id === currentDaySessions.productId && product.status === 'Approved')
        }
        // console.log(currentDaySessions)
        //console.log(Product)
        this.setState(() => ({ currentProduct: Product }))
    }


    componentDidMount() {
        Promise.all(
            [
                axios.get('/products', { headers: { 'x-auth': localStorage.getItem('token') } }),
                axios.get('/sessions', { headers: { 'x-auth': localStorage.getItem('token') } }),
                axios.get('http://worldclockapi.com/api/json/utc/now')
            ])
            .then((response) => {
                console.log(response)
                this.setState(() => ({
                    products: response[0].data,
                    sessions: response[1].data,
                    time: response[2].data.currentDateTime,
                    isLoaded: true
                }), () => { this.currentBid() })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        const { currentProduct } = this.state
        return (
            <div>
                {this.state.isLoaded &&
                    <div>
                        {!this.state.currentProduct ? 'No Product For Bidding at current Time' :
                            <div>
                                Name : {currentProduct.name}
                                Min Price : {currentProduct.minPrice}
                            </div>


                        }
                    </div>
                }
            </div >
        )
    }
}