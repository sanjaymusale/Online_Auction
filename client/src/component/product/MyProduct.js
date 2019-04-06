import React from 'react'
import axios from '../axios/config';
import { Link } from 'react-router-dom'
//import ProductStatus from './ProductStatus'


export default
    class MyProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            myProduct: [],
            isLoaded: false,
            product: []
        }
    }

    componentDidMount() {
        axios.get('/products/myproduct', { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                const { data } = response
                console.log(data)
                this.setState(() => ({ myProduct: data, product: data }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleChange = (e) => {
        const value = e.target.value
        const result = this.state.product.filter(output => output.status === value)
        // console.log('Myrsult', result)
        this.setState(() => ({ myProduct: result }))



    }

    render() {
        const { myProduct } = this.state
        //const { product } = this.state
        // //console.log(myProduct)
        // console.log(product)
        return (
            <>
                {/* <h2>MY Products - {myProduct.length}</h2> */}
                <br />

                {/* <select name="" onChange={this.handleChange}  >
                    <option value="">status</option>
                    {product.map(category => {
                        return (
                            <option key={category._id} value={category._id} > {category.status}</option>
                        )
                    })}
                </select> */}

                <select onChange={this.handleChange}>
                    <option value="">select</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>

                </select>



                <h2>My Product {myProduct.length}</h2>

                <ol>
                    {myProduct.map(product => {
                        return <li key={product._id}><Link to={`/product/${product._id}`}><b>{product.name}</b></Link></li>
                    })}
                </ol>

                {/* {this.state.isLoaded &&
                    <ProductStatus status={myProduct} />

                } */}



            </>
        )
    }
}