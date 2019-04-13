import React from 'react'
import axios from '../axios/config'
import ProductForm from './ProductForm';
import AlertDialog from './alert'
class ProductNew extends React.Component {
    constructor(){
        super()
        this.state={
            success : false,
            failure : false
        }
    }

    handleSubmit = (data) => {
        console.log(data)
        axios.post('/products', data, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                    console.log(response.data)
                    this.setState({ success : true})
                    

            })
            .catch((err) => {
                console.log(err)
            })
    }
    render(){
        console.log(this.state)

    return (
        <div>
            <ProductForm handleSubmit={this.handleSubmit} />
            <AlertDialog status={this.state.success} />
        </div>
    )
}
}
export default ProductNew