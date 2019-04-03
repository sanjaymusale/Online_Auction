import React from 'react'
import axios from '../axios/config'
import { Link } from 'react-router-dom'
import { Button, Form, Label, Input, FormText, Col } from 'reactstrap'
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
        console.log('nischal', id)
        // this.setState(() => ({ category }))

        // const id = this.state.category
        const result = this.state.product.filter(output => output.category === id)
        console.log('Myrsult', result)
        this.setState(() => ({ productData: result }))

    }

    filterHandle = (e) => {
        const value = e.target.value
        const product = this.state.product
        const result = this.state.product.filter(output => output.name.toLowerCase().includes(value.toLowerCase()))
        //console.log(result)
        this.setState(() => ({ productData: result }))
    }








    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <Input type="text" bsSize="sm" onChange={this.filterHandle} placeholder="search" />
                        <br />
                        <h5> {this.state.productData.filter(p => p.status === 'Approved').map(pro => {
                            return <li key={pro._id}> {pro.name} {pro.minPrice}<Link to={`/product/${pro._id}`}>  details</Link></li>

                        })}</h5>


                    </div>

                    <div className="col-md-7">


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



                </div>










            </div>

        )
    }
}