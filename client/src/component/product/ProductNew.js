import React from 'react'
import axios from '../axios/config'
import ProductForm from './ProductForm';
import AlertDialog from './alert'
class ProductNew extends React.Component {
    constructor() {
        super()
        this.state = {
            success: false,
            failure: false,
            id: '',

        }
    }

    handleSubmit = (data) => {
      //  console.log(data)

        axios.post('/products', data, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
               // console.log(response.data)
                this.setState({ success: true, id: response.data._id })


            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
       // console.log(this.state)

        return (
            <div>
                <ProductForm handleSubmit={this.handleSubmit} loading={this.state.loading}/>
                <AlertDialog status={this.state.success} title=" Product Submitted Successfully, Admin will Review Your Product, Once it is Approved U can Participate in Bidding Process" history={this.props.history} url={`/userProduct/${this.state.id}`} />
            </div>
        )
    }
}
export default ProductNew
