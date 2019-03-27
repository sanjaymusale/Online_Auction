import React from 'react'
import axios from '../axios/config';

export default
    class ProductForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: props.name ? props.name : '',
            minPrice: props.minPrice ? props.minPrice : '',
            categoryData: [],
            category: props.category ? props.category : '',
            description: props.description ? props.description : '',
            file: '',
            nameError: '',
            minPriceError: '',
            descriptionError: ''
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

    fileHandle = (e) => {

        const file = e.target.files
        console.log(file)
        this.setState(() => ({ file }))
    }
    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',
            minPriceError: '',
            descriptionError: ''

        }

        if (this.state.name.length < 4) {
            isError = true;
            errors.nameError = "name at least 4 character long";
        }
        if (this.state.minPrice < 50) {
            isError = true;
            errors.minPriceError = "price should be more than 50"
        }
        if (this.state.description.length < 10) {
            errors.descriptionError = "description should be more than 10 long"
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return isError
    }

    handleSubmit = (e) => {

        e.preventDefault()
        const err = this.validate()
        if (!err) {
            const { name, category, description, minPrice } = this.state
            const formData = new FormData()
            formData.append('name', name)
            formData.append('category', category)
            formData.append('description', description)
            formData.append('minPrice', minPrice)
            for (const file of this.state.file) {
                formData.append('image', file)
            }
            this.props.handleSubmit(formData)
            this.setState(() => ({ name: "", category: "", description: "", minPrice: "" }))

        }


    }

    render() {

        return (
            <div>
                <h2>FORM</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name : <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </label><br />
                    <p>{this.state.nameError}</p>
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
                    <p>{this.state.minPriceError}</p>
                    <label>
                        Description : <textarea name="description" value={this.state.description} onChange={this.handleChange} ></textarea>
                    </label><br />
                    <p>{this.state.descriptionError}</p>
                    <label>
                        file:<input type="file" name="image" onChange={this.fileHandle} multiple />
                    </label><br />
                    <button>Submit</button>

                </form>
            </div>
        )
    }
}