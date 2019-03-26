import React from 'react'
import axios from '../axios/config';

export default
    class ProductForm extends React.Component {
    constructor(props) {
        super(props)
        console.log('form props', props)
        this.state = {
            name: props.name ? props.name : '',
            minPrice: props.minPrice ? props.minPrice : '',
            categoryData: [],
            category: props.category ? props.category : '',
            description: props.description ? props.description : ''

        }
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState(() => ({ [name]: value }))

    }

    componentDidMount() {
        axios.get('/category')
            .then((response) => {
                this.setState(() => ({ categoryData: response.data }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            category: this.state.category,
            description: this.state.description,
            minPrice: this.state.minPrice,

        }
        this.props.handleSubmit(formData)
    }

    render() {

        return (
            <div>
                <h2>FORM</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name : <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </label><br />
                    <label>
                        category :
                        <select name="category" onChange={this.handleChange} >
                            <option value="">Select Category</option>
                            {this.state.categoryData.map(category => {
                                return <option key={category._id} value={category._id} >{category.name}</option>
                            })}

                        </select>
                    </label><br />
                    <label>
                        Minimum Price : <input type="number" name="minPrice" value={this.state.minPrice} onChange={this.handleChange} />
                    </label><br />
                    <label>
                        Description : <textarea name="description" value={this.state.description} onChange={this.handleChange} ></textarea>
                    </label><br />
                    <label>
                        file:<input type="file" name="myimage" multiple />
                    </label><br />
                    <button>Submit</button>

                </form>
            </div>
        )
    }
}