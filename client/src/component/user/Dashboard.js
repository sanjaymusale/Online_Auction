import React from 'react'
import axios from '../axios/config'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
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
    // componentDidMount() {
    //     axios.get('/category')
    //         .then((response) => {
    //             const data = response.data
    //             console.log(data)
    //             this.setState(() => ({ categoryData: data }))
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

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

        // const id = this.state.category
        const result = this.state.product.filter(output => output.category === id)
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
            <div>
                <label>
                    category :<br />
                    <select name="category" onChange={this.handleChange} >
                        <option value="">category</option>
                        {this.state.categoryData.map(category => {
                            return (
                                <option key={category._id} value={category._id} > {category.name}</option>
                            )
                        })}
                    </select>
                    {/* <h2>{this.state.category}</h2> */}




                </label>
                <input type="text" onChange={this.filterHandle} placeholder="search" />
                <h2> {this.state.productData.filter(p => p.status === 'Approved' && !isEmpty(p.session)).map(pro => {
                    return <li key={pro._id}> {pro.name} {pro.minPrice}<Link to={`/productdetail/${pro._id}`}>details</Link></li>

                })}</h2>



            </div>

        )
    }
}