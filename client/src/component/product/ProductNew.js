import React from 'react'
import axios from '../axios/config'
import ProductForm from './ProductForm';

const ProductNew = () => {

    const handleSubmit = (data) => {
        console.log(data)
        axios.post('/products', data, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <ProductForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default ProductNew