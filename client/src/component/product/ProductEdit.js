import React from 'react'
import axios from '../axios/config'
import ProductForm from './ProductForm';

class ProductEdit extends React.Component {
    constructor() {
        super()
        this.state = {
            product: {},
            isLoaded: false
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/products/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log('response edit', response.data)
                this.setState(() => ({ product: response.data, isLoaded: true }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleSubmit = (data) => {
        const id = this.state.product._id
        var formData = {}
        for (var pair of data.entries()) {
            formData[pair[0]] = pair[1]
        }
        axios.put(`/products/${id}`, formData, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response.data)
                this.props.history.push(`/userProduct/${id}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        const { name, category, minPrice, description, imageUrl } = this.state.product
        console.log('state', this.state.product)

        return (
            <div>
                {this.state.isLoaded &&
                    <>
                        <ProductForm
                            name={name}
                            category={{ value : category._id , label : category.name}}
                            description={description}
                            minPrice={minPrice}
                            imageUrl={imageUrl}

                            handleSubmit={this.handleSubmit} />
                       
                    </>
                }
            </div >
        )
    }
}

export default ProductEdit