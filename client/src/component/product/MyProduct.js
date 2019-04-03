import React from 'react'
import axios from '../axios/config';
import { Link } from 'react-router-dom'


export default
    class MyProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            myProduct: []
        }
    }

    componentDidMount() {
        axios.get('/products/myproduct', { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                const { data } = response
                console.log(data)
                this.setState(() => ({ myProduct: data }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { myProduct } = this.state
        return (
            <>
                <h2>MY Products - {myProduct.length}</h2>
                <ul>
                    {myProduct.map(product => {
                        return <li key={product._id}><Link to={`/product/${product._id}`}>{product.name}</Link></li>
                    })}
                </ul>

            </>
        )
    }
}