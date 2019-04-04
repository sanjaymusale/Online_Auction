import React from 'react'
import axios from '../axios/config';
import { Link } from 'react-router-dom'

class ProductShow extends React.Component {
    constructor() {
        super()
        this.state = {
            products: []
        }
        //console.log('moment', moment().format('YYYY-MM-DD hh A'))
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
                <ul>
                    {this.state.products.map(product => {
                        return <li key={product._id}><Link to={`/product/${product._id}`}>{product.name}</Link></li>
                    })}
                </ul>
            </div>
        )
    }
}

export default ProductShow