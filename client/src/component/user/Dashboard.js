import React from 'react'
import axios from '../axios/config'
import { Link } from 'react-router-dom'
import SelectCategory from './SelectCategory'

export default class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            categoryData: [],
            category: '',
            product: [],
            productData: []
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
        console.log('nischal', id)
        // this.setState(() => ({ category }))

        // const id = this.state.category
        const result = this.state.product.filter(output => output.category == id)
        console.log('Myrsult', result)
        this.setState(() => ({ productData: result }))

        // axios.get(`/category/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
        //     .then((response) => {
        //         console.log(response.data.product)
        //         this.setState(() => ({ product: response.data.product }))
        //         // this.props.history.push("/category")
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })

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
                <h2> {this.state.productData.map(pro => {
                    return <li key={pro._id}> {pro.name} {pro.minPrice}<Link to={`/product/${pro._id}`}>details</Link></li>

                })}</h2>



            </div>

        )
    }
}