import React from 'react'
import axios from '../axios/config'
import { Link } from 'react-router-dom'
// import { isEmpty } from 'lodash'

import { Input } from 'reactstrap'
import '../../App.css'
// import SelectCategory from './SelectCategory'

export default class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            categoryData: [],
            category: '',
            product: [],
            productData: [],
            filterUser: []
        }
    }


    componentDidMount() {
        Promise.all([axios.get('/category'),
        axios.get('/products', { headers: { 'x-auth': localStorage.getItem('token') } })])

            .then((response) => {
                //const data = response.data
                console.log(response)
                this.setState(() => ({ categoryData: response[0].data }))
                this.setState(() => ({ product: response[1].data, productData: response[1].data }))
            })
            .catch((err) => {
                console.log(err)
            })



    }

    handleChange = (e) => {
        const id = e.target.value
        //console.log('nischal', id)
        // this.setState(() => ({ category }))
        console.log(this.state.product)

        // const id = this.state.category
        const result = this.state.product.filter(output => output.category._id === id)
        console.log('Myrsult', result)
        this.setState(() => ({ productData: result }))

    }

    filterHandle = (e) => {
        const value = e.target.value

        const result = this.state.product.filter(output => output.name.toLowerCase().includes(value.toLowerCase()))
        //console.log(result)
        this.setState(() => ({ productData: result }))
    }








    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8" >
                        <Input type="text" bsSize="sm" onChange={this.filterHandle} placeholder="search" />
                        <br />
                    </div>

                    <div className="col-md-4">
                        < select name="category" onChange={this.handleChange} >
                            <option value="">category</option>
                            {this.state.categoryData.map(category => {
                                return (
                                    <option key={category._id} value={category._id} > {category.name}</option>
                                )
                            })}
                        </select>
                        {/* <h2>{this.state.category}</h2> */}
                    </div>


                    <div className="container">
                        <div className="row">
                            {this.state.productData.filter(p => p.status === 'Approved').map(pro => {
                                // return <li key={pro._id}> {pro.name} {pro.minPrice}<Link to={`/product/${pro._id}`}>  details</Link></li>
                                return (

                                    <div key={pro.name} className="col-md-4" style={{ marginBottom: "3rem" }}>

                                        <div className="product__text">
                                            <b>{pro.name}</b>

                                            <div className="product__boxx">
                                                <img src={pro.imageUrl[0]} style={{ width: "200px", height: "200px" }} />
                                            </div>


                                            <div className="product__text">

                                                <b>price :</b>  {pro.minPrice}

                                                <div className="product__text">

                                                    <Link to={`/products/${pro._id}`}>  details</Link>
                                                </div>





                                            </div>

                                        </div>



                                    </div>
                                )

                            })}

                        </div>
                    </div>







                </div>










            </div>

        )
    }
}