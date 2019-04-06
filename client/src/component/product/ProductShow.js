import React from 'react'
import axios from '../axios/config';
import { Link } from 'react-router-dom'
import moment from 'moment'
class ProductShow extends React.Component {
    constructor() {
        super()
        this.state = {
            products: []
        }
        console.log('moment', moment().format('YYYY-MM-DD hh A'))
    }

    componentDidMount() {
        axios.get('/products', { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response.data)
                this.setState(() => ({ products: response.data }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                Products
                <ol>
                    {this.state.products.map(product => {
                        return <li key={product._id}><Link to={`/product/${product._id}`}><b>{product.name}</b></Link></li>
                    })}
                </ol>
            </div>
        )
    }
}

export default ProductShow